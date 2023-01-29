import { useNavigate } from "react-router-dom";

const useGoBack = (fallback = "/games") => {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(fallback, { replace: true });
    }
  };

  return goBack;
};

export default useGoBack;
