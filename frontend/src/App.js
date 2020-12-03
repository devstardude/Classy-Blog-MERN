import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./App.css";
import CreatePost from "./components/posts/createPost/CreatePost";
import Home from "./components/posts/home/Home";
import MyPost from "./components/posts/myPost/MyPost";
import MyPostEdit from "./components/posts/myPostEdit/MyPostEdit";
import SinglePost from "./components/posts/singlePost/singlePost";
import { AuthContext } from "./components/shared/context/auth-context";
import Footer from "./components/shared/footer/Footer";
import { useAuth } from "./components/shared/hooks/auth-hook";
import MainNavigation from "./components/shared/navigation/MainNavigation.";
import About from "./components/users/about/about";
import Auth from "./components/users/auth/Auth";

function App() {
  const { token, name, email, login, logout, userId } = useAuth();
  let routes;
  if (!token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/users/auth" exact>
          <Auth />
        </Route>
        <Route path="/post/:postId">
          <SinglePost />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/posts/new" exact>
          <CreatePost />
        </Route>
        <Route path="/mypost/edit/:postEditId" exact>
          <MyPostEdit />
        </Route>
        <Route path="/post/:postId">
          <SinglePost />
        </Route>
        <Route path="/mypost/:userId" exact>
          <MyPost />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div className="App">
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          name: name,
          email: email,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
        <Router>
          <MainNavigation />
          {routes}
          <Footer />
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
