import Template from "./template/Template";
import ProductDetail from "./products/detail/ProductDetail";
import { Switch, Route } from "react-router-dom";
import Landing from "./landing/Landing";
import ProductList from "./products/ProductList";
import Login from "./users/login/login"

function App() {
  return (
    <Template>
      <Switch>
        <Route path="/login" exact>
        <Login />
        </Route>
        <Route path="/products" exact>
          <ProductList />
        </Route>
        <Route path="/products/:slug">
          <ProductDetail />
        </Route>
        <Route path="/" exact>
          <Landing />
        </Route>
      </Switch>
    </Template>
  );
}

export default App;
