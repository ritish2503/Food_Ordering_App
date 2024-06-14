import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import RestaurantMenuInfo from "./components/RestaurantMenuInfo";
import UserContext from "./utils/UserContext";
//Lazy Loading - Dynamic Import
const Grocery = lazy(() => import('./components/Grocery'));


const App = () => {

    const [userName, setUserName] = useState();

    useEffect(() => {
        const data = {
            name: 'Ritish Acharya'
        };
        setUserName(data.name);
    },[]);

    return (
        <UserContext.Provider value={{loggedInUser: userName, setUserName}}>
            <div>
                <Header />
                <Outlet />
            </div>
        </UserContext.Provider>

    )
}


const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Body />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/grocery',
                element: <Suspense fallback={<h1>Loading...</h1>}><Grocery /></Suspense>
            },
            {
                path: '/restaurants/:restaurantId',
                element: <RestaurantMenuInfo />
            },
        ],
        errorElement: <Error />
    },
])


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={appRouter} />)