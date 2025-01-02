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
        {
            path: "/product/:id",
            name: "product-id",
            meta: {
                layout: "default",
            },
            component: () => import("../pages/Products/Product.vue"),
        },
        {
            path: "/products/",
            name: "products",
            meta: {
                layout: "default",
            },
            component: () => import("../pages/Category/ProductList.vue"),
        },
        {
            path: "/terms-of-use",
            name: "terms of use",
            meta: {
                layout: "default",
            },
            component: () => import("../pages/Terms/index.vue"),
        },
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
