import styles from '../../styles/pages/contract/create/create.module.css'
import Header from "../../components/Header";
import {Stack, TextField} from "@mui/material";
import {DesktopDatePicker} from "@mui/x-date-pickers";

const Create = () => {



    return (
        <>
            <Header />
            <div className={styles.title}>
                <div className={styles.title_big}>
                    전자근로계약서
                </div>
                <div className={styles.title_small}>
                    표준근로계약서를 작성합니다.
                </div>
            </div>
            <div className={styles.input_box}>
                <Stack spacing={3}>
                    {/* 회사이름, 사장님 이름 등 가게 정보는 미리 입력됨. */}
                    <TextField
                        required
                        fullWidth
                        label="회사 이름(사업체명)"
                        id="fullWidth"
                        variant="standard"
                        disabled={false}
                        InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                        InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                        color='success'
                    />
                    <TextField
                        required
                        fullWidth
                        label="사장님 이름(사업주명)"
                        id="fullWidth"
                        variant="standard"
                        InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                        InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                        color='success'
                    />
                    <TextField
                        required
                        fullWidth
                        label="회사 대표번호(또는 사장님 번호)"
                        id="fullWidth"
                        variant="standard"
                        InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                        InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                        color='success'
                    />
                    
                </Stack>
            </div>
        </>
    )
}

export default Create;