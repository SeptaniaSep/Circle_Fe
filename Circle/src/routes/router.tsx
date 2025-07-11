import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/layouts/layout";
import { StatusPage } from "@/pages/middlePages/detailStatus";
import RegisterPage from "@/components/auths/registerPage";
import LoginPage from "@/components/auths/loginPage";
import ForgotPage from "@/components/auths/forgotPage";
import ResetPasswordPage from "@/components/auths/resetPwdPage";
import { MyProfilePage } from "@/pages/middlePages/profileMe/myProfile";
import ProtectedRoute from "./protectedRoute";
import { SearchPage } from "@/pages/middlePages/search";
import { Home } from "@/layouts/home";
import { AllPost } from "@/pages/middlePages/profileMe/ddMenu";
import Media from "@/pages/middlePages/profileMe/myProfMedia";
import { Follow } from "@/pages/middlePages/follow";
import { Followers } from "@/pages/middlePages/followers";
import { Following } from "@/pages/middlePages/following";
import { ProfileFrPage } from "@/pages/middlePages/profileFriend/profileFriend";
import { ImageDetailPage } from "@/pages/middlePages/detailImage";
import { AllPostFr } from "@/pages/middlePages/profileFriend/profileAllPostFriend";
import MediaFr from "@/pages/middlePages/profileFriend/profileMediaFriend";

const router = createBrowserRouter([
  {
    Component: ProtectedRoute,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          {
            index: true,
            Component: Home,
          },
          {
            path: "search",
            Component: SearchPage,
          },
          {
            path: "status/:id",
            Component: StatusPage,
          },
          {
            path: "profile/",
            Component: MyProfilePage,
            children: [
              {
                index: true,
                Component: AllPost, // default
              },
              {
                path: "AllPost",
                Component: AllPost,
              },
              {
                path: "Media",
                Component: Media,
              },
            ],
          },
          {
            path: "profileFr/:username",
            Component: ProfileFrPage,
            children: [
              {
                index: true,
                Component: AllPostFr, // default
              },
              {
                path: "AllPostFr",
                Component: AllPostFr,
              },
              {
                path: "MediaFr",
                Component: MediaFr,
              },
            ],
          },
          {
            path: "follow/:id",
            Component: Follow,
            children: [
              {
                index: true,
                Component: Followers,
              },
              {
                path: "followers",
                Component: Followers,
              },
              {
                path: "Following",
                Component: Following,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/forgot",
    Component: ForgotPage,
  },
  {
    path: "/reset",
    Component: ResetPasswordPage,
  },
  {
    path: "/detailImage",
    Component: ImageDetailPage,
  },
]);

export default router;
