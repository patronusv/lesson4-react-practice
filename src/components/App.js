import { Switch, Redirect } from 'react-router-dom';
import CardIncome from '../pages/cardIncome/CardIncome';
import CardSpendings from '../pages/cardSpendings/CardSpendings';
import Home from './home/Home';
import DataList from '../pages/dataList/DataList';

import RouteWrapper from './routeWrapper/RouteWrapper';
import { useStore } from './storeProvider/StoreProvider';
import CategoryList from './categoryList/CategoryList';
import SelectCategory from '../pages/selectCategory/SelectCategory';
const App = () => {
  const { error } = useStore();
  return (
    <>
      {error ? (
        <h1>{error.message}</h1>
      ) : (
        <Switch>
          <RouteWrapper path="/" exact>
            <Home />
          </RouteWrapper>

          <RouteWrapper path="/spending/category">
            <SelectCategory />
          </RouteWrapper>

          <RouteWrapper path="/spending/:id">
            <CardSpendings />
          </RouteWrapper>

          <RouteWrapper path="/spending">
            <CardSpendings />
          </RouteWrapper>

          <RouteWrapper path="/income/category">
            <SelectCategory />
          </RouteWrapper>

          <RouteWrapper path="/income/:id">
            <CardIncome />
          </RouteWrapper>

          <RouteWrapper path="/income">
            <CardIncome />
          </RouteWrapper>
          <RouteWrapper path="/list/:category/:category">
            <CategoryList />
          </RouteWrapper>

          <RouteWrapper path="/list/:category">
            <DataList />
          </RouteWrapper>

          <Redirect to="/" />
        </Switch>
      )}
    </>
  );
};
export default App;
