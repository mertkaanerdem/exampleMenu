import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {View, Text, FlatList} from 'react-native';

import {MenuCard, Header} from '../components';

import {menu_page} from '../styles/pages_styles';

//https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood

function MenuPage({navigation, route}) {
  const {menu} = route.params;
  const [foodMenu, setFoodMenu] = useState({});

  async function fetchMenuData() {
    await axios
      .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${menu}`)
      .then((response) => setFoodMenu(response.data));
  }

  useEffect(() => {
    fetchMenuData();
  }, []);

  const renderMenu = ({item}) => (
    <MenuCard
      data={item}
      onSelect={() => navigation.navigate('Recipe', {recipe: item.idMeal})}
    />
  );

  return (
    <View style={menu_page.container}>
      <Header title={'MENU'} onSelect={() => navigation.goBack()} />
      <FlatList
        numColumns={2}
        keyExtractor={(_, index) => index.toString()}
        data={foodMenu.meals}
        renderItem={renderMenu}
      />
    </View>
  );
}

export {MenuPage};
