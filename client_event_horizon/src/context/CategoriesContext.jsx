import { collection } from "firebase/firestore";
import { createContext } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { fireDB } from "../firebase/firbaseConfig";

export const categoriesContext = createContext(null);

const CategoriesContext = ({ children }) => {
  const [categories, categories_loading, categories_error] = useCollection(
    collection(fireDB, "categories")
  );

  return (
    <>
      <categoriesContext.Provider
        value={{ categories, categories_loading, categories_error }}
      >
        {children}
      </categoriesContext.Provider>
    </>
  );
};

export default CategoriesContext;
