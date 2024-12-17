import { defineStore } from "pinia";
import { computed, toRefs } from "vue";
import { useGetMenus } from "@/composables/API/useGetMenus";
import { useOrderStore } from "./order";
// import { useGetActiveCategories } from "@/composables/API/useGetActiveCategories";
// import { useGetActiveFood } from "@/composables/API/useGetActiveFood";
import type { IProductDto } from "@/types/api/product.dto";

export const useCatalogStore = defineStore("features-catalog", () => {
  const { isActiveOrdersCount } = toRefs(useOrderStore());

  // const productsFn = useGetActiveFood();
  // const { data: productsData, isFetching: isProductsFetching } = productsFn;
  //
  // const getProducts = async () => {
  //   const { execute } = productsFn;
  //   await execute();
  // };
  //
  // const categoriesFn = useGetActiveCategories();
  // const { data: categoriesData, isFetching: isCategoriesFetching } =
  //   categoriesFn;
  //
  // const getCategories = async () => {
  //   const { execute } = categoriesFn;
  //   await execute();
  // };

  const menus = useGetMenus();
  const { data: menusData, isFetching } = menus;

  const getMenu = async () => {
    const { execute } = menus;
    await execute();
  };

  const isActiveMenu = computed(() => {
    return isActiveOrdersCount.value === 0
      ? menusData.value?.data?.[0]
      : menusData.value?.data?.[1];
  });
  const isDateOfMenu = computed<string | undefined>(() => {
    return isActiveMenu.value?.date;
  });

  const categories = computed(() => {
    return isActiveMenu.value?.foodCategories;
  });
  const products = computed<IProductDto[] | undefined>(() => {
    return isActiveMenu.value?.foodCategories?.flatMap((item) =>
      item.foods.map((food) => ({ ...food, categoryId: item.id })),
    );
  });
  const getProductById = (id: number) => {
    const product = products.value?.find(
      (product: IProductDto) => product.id === id,
    );
    return {
      ...product,
    };
  };
  return {
    categories,
    products,
    menusData,
    isDateOfMenu,
    isFetching,
    getProductById,
    getMenu,
    // isCategoriesFetching,
    // isProductsFetching,
    // getCategories,
    // getProducts,
  };
});
