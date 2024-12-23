import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            meta: {
                layout: "default",
            },
            component: () => import("../pages/Base/HomePage.vue"),
        },
        // {
        //     path: "/category/:id",
        //     name: "category-id",
        //     meta: {
        //         layout: "default",
        //     },
        //     component: () => import("@/pages/Category/CategoryId.vue"),
        // },
        {
            path: "/products/list",
            name: "product-lists",
            meta: {
                layout: "default",
            },
            component: () => import("../pages/Category/ProductList.vue"),
        },
        // {
        //     path: "/favourites",
        //     name: "favourites",
        //     meta: {
        //         layout: "default",
        //     },
        //     component: () => import("@/pages/Products/ProductFavourite.vue"),
        // },
        // {
        //     path: "/pages/:slug",
        //     name: "siteDirection",
        //     meta: {
        //         layout: "default",
        //     },
        //     component: () => import("@/pages/UsingRouls.vue"),
        // },
        {
            path: "/:catchAll(.*)",
            name: "not-found",
            meta: {
                layout: "empty",
            },
            component: () => import("../pages/NotFound.vue"),
            
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 };
        }
    },
});

export default router;
