import { createBrowserRouter } from 'react-router-dom';
import ContainerLayout from '@/layouts/ContainerLayout';
import ManageMyTravel from '@/pages/ManageMyTravel';
import MyTravelListPage from '@/pages/MyTravelList';
import Home from '@/pages/Home';
import TravelList from '@/pages/TravelList';
import { tagDatas } from '@/data/tagDatas';
import AddTravel from '@/pages/AddTravel';
import MyPageContainerLayout from '@/components/myPage/MyPageContainer';
import MyReviews from '@/pages/MyReviews';
import MyCreatedTravel from '@/pages/MyCreatedTravel'; // 내가 만든 여행 페이지 import

import TravelDetail from '@/pages/TravelDetail';
import Bookmark from '@/pages/Bookmark';
import MyAccount from '@/pages/MyAccount';
import FindGuide from '@/pages/FindGuide';
import AddForFindGuide from '@/pages/AddForFindGuide';
import MyFindGuide from '@/pages/MyFindGuide';

const PATH = {
  HOME: '/',
} as const;

const tagPathList = tagDatas.map((data) => ({
  path: data.path,
  element: null,
}));

const router = createBrowserRouter([
  {
    element: <ContainerLayout />,
    children: [
      {
        children: [
          {
            path: '/',
            element: <Home />,
          },
          {
            path: 'travel-list',
            element: <TravelList />,
            children: tagPathList,
          },
          {
            path: 'bookmark',
            element: <Bookmark />,
          },
          {
            path: 'travel-detail/:travelId',
            element: <TravelDetail />,
          },
          {
            path: 'my-page',
            element: <MyPageContainerLayout />,
            children: [
              {
                index: true,
                path: 'my-account',
                element: <MyAccount />,
              },
              {
                path: 'my-travel-list',
                element: (
                  <div>
                    <MyTravelListPage />
                  </div>
                ),
              },
              {
                path: 'my-created-travel', // 내가 만든 여행 페이지 경로 추가
                element: (
                  <div>
                    <MyCreatedTravel />
                  </div>
                ),
                children: [
                  {
                    path: 'manage-my-travel/:travelId',
                    element: <ManageMyTravel />,
                  },
                ],
              },
              {
                path: 'my-reviews',
                element: <MyReviews />,
              },
              {
                path: 'my-find-guide',
                element: <MyFindGuide />,
              },
              {
                path: 'my-inquiries',
                element: (
                  <div>
                    <h1>마이페이지-작성한 문의</h1>
                  </div>
                ),
              },
              {
                path: 'received-inquiries',
                element: (
                  <div>
                    <h1>마이페이지-받은 문의</h1>
                  </div>
                ),
              },
            ],
          },
          {
            path: 'add-travel',
            element: <AddTravel />,
          },
          {
            path: 'find-guide',
            element: <FindGuide />,
          },
          {
            path: 'add-for-find-guide',
            element: <AddForFindGuide />,
          },
        ],
      },
    ],
  },
]);

export { router, PATH };
