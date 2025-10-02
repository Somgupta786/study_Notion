import React from 'react'
import { Outlet } from 'react-router';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useState } from 'react';
import ReviewModal from '../Components/core/ViewCourse/ReviewModal';
import VideoDetailsSidebar from '../Components/core/ViewCourse/VideoDetailsSidebar';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';

const ViewCourse = () => {
    const [reviewModal, setReviewModal] = useState(false)
    const {courseId} = useParams();
    const {token} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const setCourseSpecifics = async () => {
            const courseData = await getFullDetailsOfCourse(courseId, token);
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData( courseData.courseDetails));
            
            // Handle completed videos properly - filter out "none" placeholder
            const completedVideos = courseData.completedVideos && Array.isArray(courseData.completedVideos) 
                ? courseData.completedVideos.filter(video => video !== "none")
                : [];
            dispatch(setCompletedLectures(completedVideos));
            
            var lecture = 0;
            courseData?.courseDetails?.courseContent?.forEach((section) => {
                lecture += section?.subSection?.length;
            });
            dispatch(setTotalNoOfLectures(lecture));
            console.log("📚 Course loaded - Total lectures:", lecture, "Completed:", completedVideos.length);
        }
        setCourseSpecifics();
    }, [courseId, token, dispatch]);

  return (
    
    <div className=' flex w-screen'>
        <div className=''>
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        </div>
        <div>
            <Outlet/>
        </div>
        {
            reviewModal && <ReviewModal setReviewModal={setReviewModal} />
        }
    </div>
  )
}

export default ViewCourse