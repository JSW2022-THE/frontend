import Header from "../../components/Header";
import styles from '../../styles/pages/auth/login/login.module.css'
import kakaoLogin from '../../public/kakao_login.svg'
import Image from 'next/image'
import {useRouter} from 'next/router'

export default function Login() {

    const router = useRouter()
    const kakaoLoginClick = () =>{
        const REST_API_KEY = 'c91a830998b9123bba1465043c00c0cf'
        const REDIRECT_URI = 'http://localhost:3000/auth/callback'
        const url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`
        router.push(url)
    }

    return (
        <>
            <Header/>
            <div className={styles.login_container}>
                <div className={styles.login_box}>
                    <div className={styles.big_text}>
                        로그인
                    </div>
                    <div className={styles.small_text}>
                        로그인 후 굿잡의 청소년 안전 서비스를 이용해보세요.
                    </div>
                    <div className={styles.kakao}>
                        <Image src={kakaoLogin} alt="카카오로 로그인" onClick={kakaoLoginClick}/>
                    </div>
                </div>
            </div>
        </>
    );
}
