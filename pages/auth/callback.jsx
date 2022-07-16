import {useRouter} from "next/router";
import Header from "../../components/Header";
import styles from '../../styles/pages/auth/callback/callback.module.css'
import axios from 'axios'
import {Oval} from "react-loading-icons";

export default function Callback() {

    const router = useRouter()

    return (
        <>
            <Header/>
            <div className={styles.container}>
                <div className={styles.box}>
                    <div className={styles.big_text}>로그인 중</div>
                    <div className={styles.small_text}>사용자의 로그인을 안전하게 처리하고 있습니다.</div>
                    <div className={styles.spinner}><Oval height='50px' stroke='#009b43' strokeWidth='3' /></div>
                </div>
            </div>
        </>
    );
}
