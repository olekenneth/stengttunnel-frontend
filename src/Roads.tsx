import React, { useEffect, useState } from "react";
import { RefObject } from "react";

import { Divider, Button } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import "./App.css";
import { IRoad, IFavorite } from "./types";
import Road from "./Road";
import Ad from "./Ad";

type RoadsProps = {
  roads: IRoad[];
  favorites: IFavorite[];
};

type RoadAndAdProps = {
  road: IRoad;
};

type RefDataObject = {
  active: boolean;
  road: IRoad;
  ref: RefObject<HTMLDivElement>;
  key: string;
};

const RoadAndAd = React.forwardRef((props: RoadAndAdProps, ref: any) => {
  const r = props.road;
  return (
    <div ref={ref} key={`container-${r.urlFriendly}`}>
      <Road road={r} />
      <Divider />
      {process.env.REACT_APP_DISABLE_ADS !== "true" && (
        <>
          <Ad />
          <Divider />
        </>
      )}
    </div>
  );
});

const Roads = (props: RoadsProps) => {
  const [isMobile, setMobile] = useState<boolean>(false);
  const refs: RefDataObject[] = [];

  useEffect(() => {
    setMobile(window.innerWidth < 600 || window.innerHeight < 900);
  }, []);

  const roads = [...props.favorites]
    .reverse()
    .map((f) => props.roads.find((r) => r.urlFriendly === f))
    .filter(Boolean)
    .map((value, i) => {
      const r = value as IRoad;
      const ref = React.createRef<HTMLDivElement>();
      refs.push({
        active: i === 0 ? true : false,
        ref,
        road: r,
        key: r.urlFriendly,
      });
      return <RoadAndAd ref={ref} key={r.urlFriendly} road={r} />;
    });

  const scrollToNextRoad = (event: any, data: any) => {
    const button = event.target.closest("button");
    let activeRoadIndex = refs.findIndex((r) => r.active === true);
    refs[activeRoadIndex].active = false;

    const nextRoadIndex = ++activeRoadIndex % refs.length;
    const nextRoad = refs[nextRoadIndex];

    nextRoad.active = true;
    refs[nextRoadIndex] = nextRoad;
    nextRoad.ref.current?.scrollIntoView({
      behavior: "smooth",
    });

    if (nextRoadIndex === refs.length - 1) {
      button.style.transform = "rotate(-180deg)";
    } else {
      button.style.transform = "rotate(0)";
    }
  };

  return (
    <>
      {roads}
      {isMobile && (
        <Button
          type="primary"
          danger
          shape="circle"
          size="large"
          icon={<ArrowDownOutlined />}
          // onClick={(event, data) => scrollToNextRoad(event, data)}
          style={{
            width: "50px",
            height: "50px",
            zIndex: 10000,
            position: "fixed",
            bottom: "25px",
            left: "50%",
            marginLeft: "-31px",
          }}
        />
      )}
    </>
  );
};

export default Roads;
