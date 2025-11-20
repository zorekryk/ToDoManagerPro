import "./NotFound.css";
import Button from "@/components/shared/Button";
import { House } from "lucide-react";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h2>404</h2>
      <h3>Сторінку не знайдено</h3>
      <div>
        <Button onClick={() => navigate("/")} type="button">
          <House />
          На головну
        </Button>
      </div>
    </div>
  );
};

export default NotFound;