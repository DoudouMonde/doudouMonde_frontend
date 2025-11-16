import { useRef, useCallback } from "react";
import { normalizeName } from "../utils/normalizeName";
import {
  loadJson,
  saveJson,
  STORAGE_KEY_NAMES,
  STORAGE_KEY_NAMES_NORM,
} from "../utils/storage";
import { MAX_CHILDREN } from "../constants/childRegistration";

export const useChildNameManager = () => {
  const existingNamesNormRef = useRef<string[]>(
    loadJson(STORAGE_KEY_NAMES_NORM, [])
  );
  const existingNamesRawRef = useRef<string[]>(loadJson(STORAGE_KEY_NAMES, []));

  const isDuplicateName = useCallback((value: string): boolean => {
    return existingNamesNormRef.current.includes(normalizeName(value));
  }, []); 

  const addChildName = useCallback((newName: string): void => {
    const trimmedName = newName.trim();
    const norm = normalizeName(trimmedName);
    if (!existingNamesNormRef.current.includes(norm)) {
      existingNamesNormRef.current.push(norm);
      existingNamesRawRef.current.push(trimmedName);
      saveJson(STORAGE_KEY_NAMES_NORM, existingNamesNormRef.current);
      saveJson(STORAGE_KEY_NAMES, existingNamesRawRef.current);
    }
  }, []);

  const isLimitReached = existingNamesNormRef.current.length >= MAX_CHILDREN;

  return {
    isDuplicateName, 
    addChildName,    
    isLimitReached,  
    maxChildren: MAX_CHILDREN,
  };
};