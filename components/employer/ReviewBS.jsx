import "react-spring-bottom-sheet/dist/style.css";
import { BottomSheet } from "react-spring-bottom-sheet";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ReviewBS(props) {
  const [reviews, setReviews] = useState();
  useEffect(() => {
    if (props.storeData !== undefined) {
      axios({
        method: "GET",
        url: process.env.NEXT_PUBLIC_BACKEND_URL + "/api/review/getReviews",
        params: { store_uuid: props.storeData.store_uuid },
        withCredentials: true,
      })
        .then((res) => {
          setReviews(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props.storeData]);
  return (
    <BottomSheet
      open={props.open}
      onDismiss={() => {
        props.handleClose();
      }}
    >
      <div className="p-4">
        <p className="text-2xl font-bold">우리가게 리뷰</p>
        <div className="flex flex-col items-center mt-6">
          {reviews
            ? reviews.map((i) => {
                return (
                  <ReviewItem
                    key={i.review_uuid}
                    review_msg={i.review_msg}
                    review_createAt={i.createAt}
                  />
                );
              })
            : null}
        </div>
      </div>
    </BottomSheet>
  );
}

function ReviewItem(props) {
  return (
    <div className="flex items-center justify-between w-full py-2 min-h-12">
      <div className="flex">
        <div className="w-10 h-10">
          <FaUserCircle className="w-10 h-10 mx-1 text-gray-300 " />
        </div>

        <p className="px-4 text-sm ">{props.review_msg}</p>
      </div>
      <div className="w-16 ">
        <p className="w-16 text-sm text-gray-400 ">{props.review_createAt}</p>
      </div>
    </div>
  );
}
