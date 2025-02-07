import ChoiceTags from '@/components/addTravel/ChoiceTags';
import Course from '@/components/addTravel/Course';
import ScheduleTeam from '@/components/addTravel/ScheduleTeam';
import Details from '@/components/addTravel/Details';
import Thumbnail from '@/components/addTravel/Thumbnail';
import GrayBack from '@/components/GrayBack';
import { css } from '@emotion/react';
import Introduction from '@/components/addTravel/Introduction';
import FloatingMenu from '@/components/addTravel/FloatingMenu';
import useSectionsStore from '@/stores/useSectionsStore';
import useAddTravelStore from '@/stores/useAddTravelStore';
import useHandleAddTravel from '@/hooks/custom/useHandleAddTravel';
import useResetAddTravel from '@/hooks/custom/useResetAddTravel';
import { useEffect } from 'react';
import useModalStore from '@/stores/useModalStore';
import ConfirmModal from '@/components/ConfirmModal';
import useCreateTravel from '@/hooks/query/useCreateTravel';
import useUploadTravelImages from '@/hooks/custom/useUploadTravelImages';
import { ShowToast } from '@/components/Toast';
import useFieldStore from '@/stores/useFieldStore';
import { AddTravelData } from '@/types/travelDataType';

const AddTravel = () => {
  const sections = useSectionsStore((state) => state.sections);
  const setData = useAddTravelStore((state) => state.setData);
  const data = useAddTravelStore((state) => state.data);
  const handleAddTravel = useHandleAddTravel().handleAddTravel;
  const resetAddTravel = useResetAddTravel().resetAddTravel;
  const closeModal = useModalStore((state) => state.setModalName);

  const uploadTravelImages = useUploadTravelImages().upload;
  const mutate = useCreateTravel().mutate;

  useEffect(() => {
    resetAddTravel();
  }, [resetAddTravel]);

  const changeHandlers = {
    changeTitle: (travelTitle: string) => {
      setData({ travelTitle });
    },

    changePrice: (travelPrice: number) => {
      setData({ travelPrice: travelPrice === 0 ? null : travelPrice });
    },
  };

  const handleConfirmZeroPrice = async () => {
    closeModal(null);
    const imageResult = await uploadTravelImages();
    if (!imageResult) {
      ShowToast('이미지가 업로드 되지 않았습니다.', 'failed');
      return;
    }
    const data: AddTravelData = {
      userId: useAddTravelStore.getState().data.userId,
      travelContent: useFieldStore.getState().fields.content,
      travelTitle: useAddTravelStore.getState().data.travelTitle,
      thumbnail: null,
      travelPrice: useAddTravelStore.getState().data.travelPrice || 0,
      includedItems: useFieldStore.getState().fields.includeList,
      FAQ: useFieldStore.getState().fields.faqs,
      meetingTime: useFieldStore.getState().fields.meetingTime,
      excludedItems: useFieldStore.getState().fields.excludeList,
      meetingPlace: useAddTravelStore.getState().data.meetingPlace,
      tag: useAddTravelStore.getState().data.tag,
      team: useFieldStore.getState().fields.scheduleList,
      travelCourse: useFieldStore.getState().fields.courseList,
    };
    mutate({
      ...data,
      thumbnail: imageResult.thumbnail,
      meetingPlace: imageResult.meetingPlace,
    });
  };

  return (
    <div css={pageLayoutWrapper}>
      <div css={addTravelWrapper}>
        <h1>새로운 여행 계획하기</h1>
        <GrayBack title={'제목'} padding={true}>
          <input
            css={noneStyleInput}
            type="text"
            placeholder="30자 내외로 작성해주세요."
            onChange={(e) => changeHandlers.changeTitle(e.target.value)}
            value={data.travelTitle || ''}
          />
        </GrayBack>
        <Thumbnail type="thumbnail" />
        <Introduction />
        <Course />
        <ChoiceTags />
        <ScheduleTeam />
        <GrayBack title={'가격'} price={true} padding={true}>
          <input
            css={noneStyleInput}
            type="number"
            placeholder="0"
            step="1000"
            max="10000000"
            min="0"
            onChange={(e) => changeHandlers.changePrice(Number(e.target.value))}
            value={data.travelPrice || ''}
            required
          />
          <span css={{ marginRight: '5px' }}>원</span>
          <span css={{ fontSize: '14px' }}>/ 1인</span>
        </GrayBack>

        {sections.includes('포함내용') && <Details title={'포함내용'} />}
        {sections.includes('미포함내용') && <Details title={'미포함내용'} />}
        {sections.includes('이용안내') && <Details title={'이용안내'} />}
        {sections.includes('FAQ') && <Details title={'FAQ'} />}
      </div>

      <FloatingMenu onSubmit={handleAddTravel} />
      <ConfirmModal
        modalId="zero-price-confirm"
        trigger={<></>}
        message={
          <div css={{ fontWeight: '600', fontSize: '18px' }}>
            여행 가격이 0원입니다. 계속 하시겠습니까?
          </div>
        }
        onConfirm={handleConfirmZeroPrice}
      />
    </div>
  );
};

export default AddTravel;

export const addTravelWrapper = css`
  position: relative;
  width: 680px;
  margin-right: 200px;
  & h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
`;

export const noneStyleInput = css`
  width: 100%;
  background-color: transparent;
  border: none;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    display: none;
  }
`;

export const pageLayoutWrapper = css`
  display: flex;
  position: relative;
`;
