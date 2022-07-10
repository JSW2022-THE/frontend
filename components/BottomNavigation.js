import styles from "../styles/components/BottomNavigation/BottomNavigation.module.css";
import {
  IoHomeSharp,
  IoBook,
  IoCompassSharp,
  IoPersonSharp,
  IoBuildSharp,
} from "react-icons/io5";
import classNames from "classnames";
import { useRouter } from "next/router";

export default function BottomNavigation(props) {
  const navItems = [
    { id: 1, name: "홈", iconName: IoHomeSharp, path: "/worker/home" },
    {
      id: 2,
      name: "내 주변",
      iconName: IoCompassSharp,
      path: "/worker/nearby",
    },
    { id: 3, name: "지식", iconName: IoBook, path: "/worker/knowledge" },
    { id: 4, name: "도구", iconName: IoBuildSharp, path: "/worker/tools" },
    {
      id: 5,
      name: "내 메뉴",
      iconName: IoPersonSharp,
      path: "/worker/mypage",
    },
  ];
  return (
    <>
      <div className={styles.bottom_navigation}>
        {/* 메뉴 갯수에 따라 scss 파일에서 float 변경 (메뉴 갯수로) */}
        <div className={styles.menu}>
          {navItems.map((item) => {
            return <NavItem key={item.id} itemData={item} />;
          })}
        </div>
      </div>
    </>
  );
}

function NavItem(props) {
  const router = useRouter();
  return (
    <div
      className={classNames(
        styles.menu_box,
        props.itemData.path === router.pathname ? styles.menu_active : null
      )}
      onClick={() => {
        router.push(props.itemData.path);
      }}
    >
      <div className={styles.menu_center}>
        <div className={styles.menu_icon}>
          <props.itemData.iconName />
        </div>
        <div className={styles.menu_name}>{props.itemData.name}</div>
      </div>
    </div>
  );
}
