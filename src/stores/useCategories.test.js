import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCategories } from './useCategories';

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

describe('useCategories', () => {
  beforeEach(() => {
    localStorage.clear();
    const { result } = renderHook(() => useCategories());
    act(() => {
      result.current.categories.forEach(category => {
        result.current.removeCategory(category.id);
      });
    });
  });

  describe('початковий стан', () => {
    it('має порожній масив категорій', () => {
      const { result } = renderHook(() => useCategories());

      expect(result.current.categories).toEqual([]);
    });
  });

  describe('addCategory', () => {
    it('додає нову категорію до списку', () => {
      const { result } = renderHook(() => useCategories());

      act(() => {
        result.current.addCategory({
          name: 'Робота',
          color: '#ff0000',
        });
      });

      expect(result.current.categories).toHaveLength(1);
      expect(result.current.categories[0]).toMatchObject({
        name: 'Робота',
        color: '#ff0000',
      });
      expect(result.current.categories[0].id).toBeDefined();
    });

    it('додає кілька категорій', () => {
      const { result } = renderHook(() => useCategories());

      act(() => {
        result.current.addCategory({ name: 'Робота' });
        result.current.addCategory({ name: 'Особисте' });
        result.current.addCategory({ name: 'Навчання' });
      });

      expect(result.current.categories).toHaveLength(3);
      expect(result.current.categories[0].name).toBe('Робота');
      expect(result.current.categories[1].name).toBe('Особисте');
      expect(result.current.categories[2].name).toBe('Навчання');
    });

    it('генерує унікальний id для кожної категорії', () => {
      const { result } = renderHook(() => useCategories());

      act(() => {
        result.current.addCategory({ name: 'Категорія 1' });
        result.current.addCategory({ name: 'Категорія 2' });
      });

      const ids = result.current.categories.map(cat => cat.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(2);
    });

    it('зберігає всі передані властивості', () => {
      const { result } = renderHook(() => useCategories());

      act(() => {
        result.current.addCategory({
          name: 'Тестова категорія',
          color: '#00ff00',
          icon: '📚',
          description: 'Опис категорії',
        });
      });

      expect(result.current.categories[0]).toMatchObject({
        name: 'Тестова категорія',
        color: '#00ff00',
        icon: '📚',
        description: 'Опис категорії',
      });
    });
  });

  describe('removeCategory', () => {
    it('видаляє категорію за id', () => {
      const { result } = renderHook(() => useCategories());

      act(() => {
        result.current.addCategory({ name: 'Для видалення' });
      });

      const categoryId = result.current.categories[0].id;

      act(() => {
        result.current.removeCategory(categoryId);
      });

      expect(result.current.categories).toHaveLength(0);
    });

    it('видаляє тільки вказану категорію', () => {
      const { result } = renderHook(() => useCategories());

      act(() => {
        result.current.addCategory({ name: 'Категорія 1' });
        result.current.addCategory({ name: 'Категорія 2' });
        result.current.addCategory({ name: 'Категорія 3' });
      });

      const categoryIdToRemove = result.current.categories[1].id;

      act(() => {
        result.current.removeCategory(categoryIdToRemove);
      });

      expect(result.current.categories).toHaveLength(2);
      expect(result.current.categories.find(c => c.id === categoryIdToRemove)).toBeUndefined();
      expect(result.current.categories[0].name).toBe('Категорія 1');
      expect(result.current.categories[1].name).toBe('Категорія 3');
    });

    it('не змінює масив при видаленні неіснуючої категорії', () => {
      const { result } = renderHook(() => useCategories());

      act(() => {
        result.current.addCategory({ name: 'Категорія' });
      });

      const categoriesBeforeRemove = [...result.current.categories];

      act(() => {
        result.current.removeCategory('non-existent-id');
      });

      expect(result.current.categories).toEqual(categoriesBeforeRemove);
    });

    it('видаляє всі категорії послідовно', () => {
      const { result } = renderHook(() => useCategories());

      act(() => {
        result.current.addCategory({ name: 'Категорія 1' });
        result.current.addCategory({ name: 'Категорія 2' });
      });

      const ids = result.current.categories.map(c => c.id);

      act(() => {
        ids.forEach(id => result.current.removeCategory(id));
      });

      expect(result.current.categories).toHaveLength(0);
    });
  });

  describe('editCategory', () => {
    it('редагує існуючу категорію', () => {
      const { result } = renderHook(() => useCategories());

      act(() => {
        result.current.addCategory({
          name: 'Стара назва',
          color: '#000000',
        });
      });

      const categoryId = result.current.categories[0].id;

      act(() => {
        result.current.editCategory(categoryId, {
          name: 'Нова назва',
          color: '#ffffff',
        });
      });

      expect(result.current.categories[0]).toMatchObject({
        name: 'Нова назва',
        color: '#ffffff',
      });
    });

    it('зберігає незмінені поля', () => {
      const { result } = renderHook(() => useCategories());

      act(() => {
        result.current.addCategory({
          name: 'Назва',
          color: '#ff0000',
          icon: '🎯',
        });
      });

      const categoryId = result.current.categories[0].id;

      act(() => {
        result.current.editCategory(categoryId, {
          name: 'Нова назва',
        });
      });

      expect(result.current.categories[0]).toMatchObject({
        name: 'Нова назва',
        color: '#ff0000',
        icon: '🎯',
      });
    });

    it('зберігає id категорії після редагування', () => {
      const { result } = renderHook(() => useCategories());

      act(() => {
        result.current.addCategory({ name: 'Категорія' });
      });

      const originalId = result.current.categories[0].id;

      act(() => {
        result.current.editCategory(originalId, {
          name: 'Оновлена категорія',
        });
      });

      expect(result.current.categories[0].id).toBe(originalId);
    });

    it('не змінює інші категорії при редагуванні', () => {
      const { result } = renderHook(() => useCategories());

      act(() => {
        result.current.addCategory({ name: 'Категорія 1', color: '#111111' });
        result.current.addCategory({ name: 'Категорія 2', color: '#222222' });
        result.current.addCategory({ name: 'Категорія 3', color: '#333333' });
      });

      const categoryIdToEdit = result.current.categories[1].id;

      act(() => {
        result.current.editCategory(categoryIdToEdit, {
          name: 'Оновлена категорія 2',
        });
      });

      expect(result.current.categories[0]).toMatchObject({
        name: 'Категорія 1',
        color: '#111111',
      });
      expect(result.current.categories[1]).toMatchObject({
        name: 'Оновлена категорія 2',
        color: '#222222',
      });
      expect(result.current.categories[2]).toMatchObject({
        name: 'Категорія 3',
        color: '#333333',
      });
    });

    it('не змінює масив при редагуванні неіснуючої категорії', () => {
      const { result } = renderHook(() => useCategories());

      act(() => {
        result.current.addCategory({ name: 'Категорія' });
      });

      const categoriesBeforeEdit = [...result.current.categories];

      act(() => {
        result.current.editCategory('non-existent-id', {
          name: 'Нова назва',
        });
      });

      expect(result.current.categories).toEqual(categoriesBeforeEdit);
    });

    it('може додавати нові поля при редагуванні', () => {
      const { result } = renderHook(() => useCategories());

      act(() => {
        result.current.addCategory({ name: 'Категорія' });
      });

      const categoryId = result.current.categories[0].id;

      act(() => {
        result.current.editCategory(categoryId, {
          description: 'Новий опис',
          priority: 'high',
        });
      });

      expect(result.current.categories[0]).toMatchObject({
        name: 'Категорія',
        description: 'Новий опис',
        priority: 'high',
      });
    });
  });

  describe('persist middleware', () => {
    it('зберігає дані в localStorage', () => {
      const { result } = renderHook(() => useCategories());

      act(() => {
        result.current.addCategory({ name: 'Тестова категорія' });
      });

      const stored = localStorage.getItem('categories');
      expect(stored).toBeTruthy();

      const parsed = JSON.parse(stored);
      expect(parsed.state.categories).toHaveLength(1);
      expect(parsed.state.categories[0].name).toBe('Тестова категорія');
    });
  });
});