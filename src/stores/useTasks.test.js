import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTasks, useFilteredTasks } from './useTasks';

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

Object.defineProperty(crypto, 'randomUUID', {
  value: () => Math.random().toString(36).substring(2, 15),
});

describe('useTasks', () => {
  beforeEach(() => {
    localStorage.clear();
    const { result } = renderHook(() => useTasks());
    act(() => {
      result.current.tasks.forEach(task => {
        result.current.removeTask(task.id);
      });
      result.current.setSearchQuery('');
      result.current.setFilterStatus('all');
    });
  });

  describe('addTask', () => {
    it('додає нову задачу до списку', () => {
      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.addTask({
          title: 'Тестова задача',
          description: 'Опис задачі',
        });
      });

      expect(result.current.tasks).toHaveLength(1);
      expect(result.current.tasks[0]).toMatchObject({
        title: 'Тестова задача',
        description: 'Опис задачі',
        completed: false,
      });
      expect(result.current.tasks[0].id).toBeDefined();
    });

    it('додає кілька задач', () => {
      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.addTask({ title: 'Задача 1' });
        result.current.addTask({ title: 'Задача 2' });
        result.current.addTask({ title: 'Задача 3' });
      });

      expect(result.current.tasks).toHaveLength(3);
    });
  });

  describe('removeTask', () => {
    it('видаляє задачу за id', () => {
      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.addTask({ title: 'Задача для видалення' });
      });

      const taskId = result.current.tasks[0].id;

      act(() => {
        result.current.removeTask(taskId);
      });

      expect(result.current.tasks).toHaveLength(0);
    });

    it('не видаляє інші задачі', () => {
      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.addTask({ title: 'Задача 1' });
        result.current.addTask({ title: 'Задача 2' });
        result.current.addTask({ title: 'Задача 3' });
      });

      const taskIdToRemove = result.current.tasks[1].id;

      act(() => {
        result.current.removeTask(taskIdToRemove);
      });

      expect(result.current.tasks).toHaveLength(2);
      expect(result.current.tasks.find(t => t.id === taskIdToRemove)).toBeUndefined();
    });
  });

  describe('editTask', () => {
    it('редагує існуючу задачу', () => {
      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.addTask({
          title: 'Стара назва',
          description: 'Старий опис',
        });
      });

      const taskId = result.current.tasks[0].id;

      act(() => {
        result.current.editTask(taskId, {
          title: 'Нова назва',
          description: 'Новий опис',
        });
      });

      expect(result.current.tasks[0]).toMatchObject({
        title: 'Нова назва',
        description: 'Новий опис',
      });
    });

    it('зберігає незмінені поля', () => {
      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.addTask({
          title: 'Назва',
          description: 'Опис',
        });
      });

      const taskId = result.current.tasks[0].id;
      const originalCompleted = result.current.tasks[0].completed;

      act(() => {
        result.current.editTask(taskId, {
          title: 'Нова назва',
        });
      });

      expect(result.current.tasks[0].description).toBe('Опис');
      expect(result.current.tasks[0].completed).toBe(originalCompleted);
    });
  });

  describe('toggleTask', () => {
    it('перемикає статус completed', () => {
      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.addTask({ title: 'Задача' });
      });

      const taskId = result.current.tasks[0].id;

      expect(result.current.tasks[0].completed).toBe(false);

      act(() => {
        result.current.toggleTask(taskId);
      });

      expect(result.current.tasks[0].completed).toBe(true);

      act(() => {
        result.current.toggleTask(taskId);
      });

      expect(result.current.tasks[0].completed).toBe(false);
    });
  });

  describe('setSearchQuery', () => {
    it('встановлює пошуковий запит', () => {
      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.setSearchQuery('тестовий запит');
      });

      expect(result.current.searchQuery).toBe('тестовий запит');
    });
  });

  describe('setFilterStatus', () => {
    it('встановлює статус фільтра', () => {
      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.setFilterStatus('completed');
      });

      expect(result.current.filterStatus).toBe('completed');
    });
  });

  describe('getFilteredTasks', () => {
    beforeEach(() => {
      const { result } = renderHook(() => useTasks());
      act(() => {
        result.current.addTask({ title: 'Активна задача', description: 'Опис 1' });
        result.current.addTask({ title: 'Завершена задача', description: 'Опис 2' });
        result.current.addTask({ title: 'Інша активна', description: 'Особливий опис' });
      });

      const tasks = result.current.tasks;
      act(() => {
        result.current.toggleTask(tasks[1].id);
      });
    });

    it('повертає всі задачі при фільтрі "all"', () => {
      const { result } = renderHook(() => useTasks());

      const filtered = result.current.getFilteredTasks({
        tasks: result.current.tasks,
        searchQuery: '',
        filterStatus: 'all',
      });

      expect(filtered).toHaveLength(3);
    });

    it('фільтрує тільки активні задачі', () => {
      const { result } = renderHook(() => useTasks());

      const filtered = result.current.getFilteredTasks({
        tasks: result.current.tasks,
        searchQuery: '',
        filterStatus: 'active',
      });

      expect(filtered).toHaveLength(2);
      expect(filtered.every(task => !task.completed)).toBe(true);
    });

    it('фільтрує тільки завершені задачі', () => {
      const { result } = renderHook(() => useTasks());

      const filtered = result.current.getFilteredTasks({
        tasks: result.current.tasks,
        searchQuery: '',
        filterStatus: 'completed',
      });

      expect(filtered).toHaveLength(1);
      expect(filtered[0].completed).toBe(true);
    });

    it('шукає по назві задачі', () => {
      const { result } = renderHook(() => useTasks());

      const filtered = result.current.getFilteredTasks({
        tasks: result.current.tasks,
        searchQuery: 'активна',
        filterStatus: 'all',
      });

      expect(filtered).toHaveLength(2);
    });

    it('шукає по опису задачі', () => {
      const { result } = renderHook(() => useTasks());

      const filtered = result.current.getFilteredTasks({
        tasks: result.current.tasks,
        searchQuery: 'особливий',
        filterStatus: 'all',
      });

      expect(filtered).toHaveLength(1);
      expect(filtered[0].title).toBe('Інша активна');
    });

    it('пошук не чутливий до регістру', () => {
      const { result } = renderHook(() => useTasks());

      const filtered = result.current.getFilteredTasks({
        tasks: result.current.tasks,
        searchQuery: 'АКТИВНА',
        filterStatus: 'all',
      });

      expect(filtered).toHaveLength(2);
    });

    it('комбінує фільтр і пошук', () => {
      const { result } = renderHook(() => useTasks());

      const filtered = result.current.getFilteredTasks({
        tasks: result.current.tasks,
        searchQuery: 'активна',
        filterStatus: 'active',
      });

      expect(filtered).toHaveLength(2);
      expect(filtered.every(task => !task.completed)).toBe(true);
    });
  });
});

describe('useFilteredTasks', () => {
  beforeEach(() => {
    localStorage.clear();
    const { result } = renderHook(() => useTasks());
    act(() => {
      result.current.tasks.forEach(task => {
        result.current.removeTask(task.id);
      });
      result.current.setSearchQuery('');
      result.current.setFilterStatus('all');
    });
  });

  it('повертає відфільтровані задачі', () => {
    const { result: storeResult } = renderHook(() => useTasks());

    act(() => {
      storeResult.current.addTask({ title: 'Задача 1' });
      storeResult.current.addTask({ title: 'Задача 2' });
      storeResult.current.setSearchQuery('Задача 1');
    });

    const { result } = renderHook(() => useFilteredTasks());

    expect(result.current).toHaveLength(1);
    expect(result.current[0].title).toBe('Задача 1');
  });
});