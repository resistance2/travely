import reviewImage from '@/assets/reviewImg.png';
import ReviewCard from '@/components/myReview/ReviewCard';
import useGetReviews from '@/hooks/query/useGetReviews';
import useUserStore from '@/stores/useUserStore';
import { Review } from '@/types/reviewType';
// import { Review } from '@/types/reviewType';
// import ReviewWriteModal from '@/components/myReview/ReviewWriteModal';

const data: { reviews: Review[] } = {
  reviews: [
    {
      reviewId: 1,
      title: '대한 고궁 투어',
      content:
        '경복궁은 한국의 역사와 전통을 온전히 느낄 수 있는 곳이었어요. 정문인 광화문을 지나 들어서면 웅장한 근정전과 경회루가 시선을 사로잡고, 조용한 연못과 정원은 마치 옛 시대로 돌아간 듯한 기분을 주었답니다. 주변의 한복 대여점에서 한복을 입고 방문하니 더욱 특별한 추억으로 남았어요. 고즈넉한 분위기 속에서 시간을 보내며 한국의 멋과 아름다움을 새삼 느낄 수 있었던 시간이었어요.',
      imgSrc: reviewImage,
      createdAt: '2024-10-25',
      reviewCount: 10,
      rating: 4.5,
    },
    {
      reviewId: 2,
      title: '대한 고궁 투어',
      content:
        '경복궁은 한국의 역사와 전통을 온전히 느낄 수 있는 곳이었어요. 정문인 광화문을 지나 들어서면 웅장한 근정전과 경회루가 시선을 사로잡고, 조용한 연못과 정원은 마치 옛 시대로 돌아간 듯한 기분을 주었답니다. 주변의 한복 대여점에서 한복을 입고 방문하니 더욱 특별한 추억으로 남았어요. 고즈넉한 분위기 속에서 시간을 보내며 한국의 멋과 아름다움을 새삼 느낄 수 있었던 시간이었어요.',
      imgSrc: reviewImage,
      createdAt: '2024-10-25',
      reviewCount: 10,
      rating: 5.0,
    },
    {
      reviewId: 3,
      title: '대한 고궁 투어',
      content:
        '경복궁은 한국의 역사와 전통을 온전히 느낄 수 있는 곳이었어요. 정문인 광화문을 지나 들어서면 웅장한 근정전과 경회루가 시선을 사로잡고, 조용한 연못과 정원은 마치 옛 시대로 돌아간 듯한 기분을 주었답니다. 주변의 한복 대여점에서 한복을 입고 방문하니 더욱 특별한 추억으로 남았어요. 고즈넉한 분위기 속에서 시간을 보내며 한국의 멋과 아름다움을 새삼 느낄 수 있었던 시간이었어요.',
      imgSrc: reviewImage,
      createdAt: '2024-10-25',
      reviewCount: 10,
      rating: 4.7,
    },
  ],
};

// content: "리뷰 후기 잓성"
// createdDate: "2025-01-24T07:21:44.020Z"
// id: "67935abea99275a99b724ddf"
// isVerifiedUser: false
// reviewImg: Array []
// socialName: "23 23"
// travelId: "6764c9931aff3d14597f71f4"
// travelScore: 5
// travelTitle: ""
// userEmail: "badadclocfcfddk@gmail.com"
// userProfileImage: "https://d2epmqt9moz4ga.cloudfront.net/3add0631-4ca7-4aba-aac8-a299037842eb.png"

const MyReviews = () => {
  const user = useUserStore((state) => state.user);

  const { data: reviews, isLoading } = useGetReviews({
    userId: (user?.userId as string) || '',
  });
  console.log(reviews?.pages[0].data.data.reviews, isLoading);

  const reviewsData = reviews?.pages[0].data.data.reviews;

  return (
    <div>
      {isLoading ? (
        <div>loading</div>
      ) : reviewsData && reviewsData.length > 0 ? (
        data.reviews.map((review: Review) => (
          <ReviewCard
            key={review.reviewId}
            review={review}
            showTitle={true}
            showUser={false}
            showDate={true}
            showDelete={true}
          />
        ))
      ) : (
        <div>No reviews found</div>
      )}
    </div>
  );
};

export default MyReviews;
