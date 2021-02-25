import React from 'react';
import {View, Text, FlatList} from 'react-native';
import useApi from './hooks/useApi';
import {CategoryButton, Suggestion} from './components';

const HomeScreen = () => {
  const {result, loading, error, useRequest} = useApi();
  const {
    result: resultMeals,
    loading: loadingMeals,
    error: errorMeals,
    useRequest: requestMeals,
  } = useApi();
  const [selectedCategory, setSelectedCategory] = React.useState({});

  function getMealsByCategory() {
    requestMeals(`filter.php?c=${selectedCategory.strCategory}`, 'GET');
  }

  React.useEffect(() => {
    //Tüm ürün kategorileri burada çekilir. useRequest custom hook'tan gelen fonksiyondur.
    useRequest('categories.php', 'GET');
    
  }, []);

  //Eğer bir kategori seçiliyse seçilen kategorideki ürünleri getirir. Her kategori değiştiğinde yeniden tetiklenir.
  React.useEffect(() => {
    if (selectedCategory) {
      getMealsByCategory();
    }
  }, [selectedCategory]);

  //Her kategori seçimi yapıldığında kategori burada set edilir.
  function onSelect(item) {
    setSelectedCategory(item);
  }
  //En üstteki butonlarımızı bu fonksiyonda Render ediyoruz.
  function renderItem({item}) {
    return (
      <CategoryButton
        title={item.strCategory}
        onSelect={() => onSelect(item)}
        selected={
          selectedCategory?.idCategory === item.idCategory ? true : false
        }
      />
    );
  }
  return (
    <View style={{flex: 1}}>
      <View>
        <FlatList
          data={result.categories}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Suggestion />
    </View>
  );
};

export default HomeScreen;
