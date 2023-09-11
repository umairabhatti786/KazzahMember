import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store';
import {ImageURISource} from 'react-native';

export interface CategoryItem {
  id: number;
  name: string;
  icon: string;
  teamId: number;
}

export interface ProItem {
  id: number;
  name: string;
  image: ImageURISource;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface Categories {
  categories: CategoryItem[];
  proCategories: ProItem[];
}

export const initialState: Categories = {
  categories: [],
  proCategories: [],
};

const categoriesSlic = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, {payload}: PayloadAction<CategoryItem[]>) => {
      state.categories = payload;
    },

    setProCategory: (state, {payload}: PayloadAction<ProItem[]>) => {
      state.proCategories = payload;
    },
  },
});

export const {setCategory, setProCategory} = categoriesSlic.actions;
export default categoriesSlic.reducer;

export const categorySelector = (state: RootState) => {
  let list = [...state.category.categories];

  list.sort((a, b) => a.name.localeCompare(b.name));
  

  let newCategories = [{name: 'Add', id: 9}, ...list];

  return {categories: list};
};
export const categorySelectorWithOutAdd = (state: RootState) => {
  let list = [...state.category.categories];

  list.sort((a, b) => a.name.localeCompare(b.name));

  let newCategories = [...list];

  return newCategories;
};

export const getProCategories = (state: RootState) => {
  return state.category.proCategories;
};
