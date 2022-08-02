import styles from '../../styles/pages/contract/create/create.module.css'
import Header from "../../components/Header";
import {
    Checkbox, FormControl, FormControlLabel,
    FormGroup, FormLabel,
    InputAdornment,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Stack,
    TextField,
    Alert,
    AlertTitle, Button
} from "@mui/material";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import {useEffect, useRef, useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {ko} from "date-fns/locale"
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {useRouter} from "next/router";
import SignatureCanvas from "react-signature-canvas";
import ReplayIcon from '@mui/icons-material/Replay';

const Create = () => {

    const [value, setValue] = useState(new Date());
    const handleChange = (newValue) => {
        setValue(newValue);
    };
    const [endDateText, setEndDateText] = useState()
    const [workWeekText, setWorkWeekText] = useState()
    const [workTimeSelectMenuItem, setWorkTimeSelectMenuItem] = useState([])
    const [workTimeText, setWorkTimeText] = useState()
    const [workLocationText, setWorkLocationText] = useState()
    const router = useRouter()
    const signCanvas = useRef()

    //INPUT_DATA
    const [formData, setFormData] = useState({

    })

    useEffect(()=>{
        if(!router.isReady) return
        setEndDateText(
            <>
                - 근로계약기간의 정함이 없는 경우에는 시작일만 입력하세요
                <br/>
                - 근로계약기간은 1년을 초과할 수 없습니다. 단 일정한 사업의 완료가 예정되어 있어서 사업기간이 정하여져 있는 경우에는 사업완료에 필요한 기간이 비록 1년을 초과하더라도 그 기간동안을 근로계약을 체결할 수 있습니다.
            </>
        )
        setWorkWeekText(
            <>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                - "주소정근로시간" 이라함은 근로자와 사용자가 정한 1주 동안 근로하는 근로시간을 말합니다.
                <br/>
                - 15세 이상 18세 미만 청소년의 근로시간은 1일에 7시간, 1주에 35시간을 초과하여 일할 수 없습니다. (「근로기준법」 제69조)
                <br/>
                - 예외적으로 사용자와 청소년 사이에 합의를 한 경우에는 하루에 1시간, 1주에 5시간을 한도로 연장하여 일할 수 있습니다. (「근로기준법」 제69조)
            </>
        )
        setWorkTimeText(
            <>
                - 원칙적으로 청소년은 밤 10시 이후로 근무할 수 없지만, 청소년이 형평상 어쩔 수 없이 근무해야 한다면 건강과 학업에 지장이 없는 선에서 청소년 본인이 동의하고 고용노동부 인가를 받으면 밤 10시부터 새벽 6시까지 일할 수 있습니다.
            </>
        )
        setWorkLocationText(
            <>
                - 청소년은 제조업체, 패스트푸드점, 술을 판매하지 않는 일반 음식점, 편의점, 주유소 등 에서 근무가 가능합니다.
                <br/>
                - 청소년은 유흥주점, 단란주점, 비디오방, 노래방(청소년 출입허용 시설업소는 가능), PC방, 전화방, 숙박업, 이용업, 안마실을 설치한 목욕장업, 만화대여업, 술을 판매하는 소주방, 호프, 카페, 무도장업, 사행행위영업 등에 근무할 수 없습니다.
                <br/>
                - 고압 및 잠수 작업, 유류, 양조업무, 도살, 교도소 등과 같이 청소년보호법상 고용금지 직종이거나 도덕ㆍ보건 측면에서 유해하거나 위험한 일은 할 수 없습니다.
            </>
        )
        let timeList = []
        for(let i=0; i<25; i++) {
            let slot = '오전'
            let num = i
            if (i/2 >= 6) slot = '오후'
            if (i/2 > 6) num = i - 12
            if (i/2 != 12) {
                timeList = [...timeList,
                    <MenuItem key={i} className={styles.menuItem} value={`${slot} ${num}:00`}>{`${slot} ${num}:00`}</MenuItem>,
                    <MenuItem key={i+24} className={styles.menuItem} value={`${slot} ${num}:00`}>{`${slot} ${num}:30`}</MenuItem>]
            }
        }
        setWorkTimeSelectMenuItem(timeList)

    }, [router.isReady])

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
                <LocalizationProvider locale={ko} dateAdapter={AdapterDateFns}>
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
                        <MobileDatePicker
                            label="계약 시작일"
                            inputFormat="yyyy년 MM월 dd일"
                            value={value}
                            onChange={handleChange}
                            InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                            renderInput={(params) => <TextField
                                required
                                fullWidth
                                variant="standard"
                                InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                {...params} />}
                        />
                        <MobileDatePicker
                            label="계약 종료일"
                            inputFormat="yyyy년 MM월 dd일"
                            value={value}
                            onChange={handleChange}
                            InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                            renderInput={(params) => <TextField
                                fullWidth
                                variant="standard"
                                InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                {...params}
                                helperText={endDateText}
                                FormHelperTextProps={{
                                    className: styles.info
                                }}
                            />}
                        />
                        <TextField
                            required
                            fullWidth
                            label="근무장소(위치)"
                            id="fullWidth"
                            variant="standard"
                            InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                            InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                            color='success'
                            helperText={workLocationText}
                            FormHelperTextProps={{
                                className: styles.info
                            }}
                        />
                        <TextField
                            required
                            fullWidth
                            label="업무의 내용"
                            id="fullWidth"
                            variant="standard"
                            InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                            InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                            color='success'
                        />
                        <TextField
                            required
                            fullWidth
                            label="주소정근로시간(일하기로 정한 시간)"
                            id="fullWidth"
                            variant="standard"
                            InputProps={{
                                style: { fontFamily: 'pretendard', fontWeight: 500 },
                                startAdornment: <InputAdornment position="start"><div className={styles.info}>주</div></InputAdornment>,
                                endAdornment: <InputAdornment position="end"><div className={styles.info}>시간</div></InputAdornment>
                            }}
                            InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                            color='success'
                            helperText={workWeekText}
                            FormHelperTextProps={{
                                className: styles.info
                            }}
                        />
                        <TextField
                            select
                            label="근무형태"
                            required
                            fullWidth
                            className={styles.info}
                            variant="standard"
                            hiddenLabel={false}
                            defaultValue=""
                            color='success'
                            InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                            InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                        >
                            <MenuItem className={styles.menuItem} key={1} value='주 1회'>주 1회</MenuItem>
                            <MenuItem className={styles.menuItem} key={2} value='주 2회'>주 2회</MenuItem>
                            <MenuItem className={styles.menuItem} key={3} value='주 3회'>주 3회</MenuItem>
                            <MenuItem className={styles.menuItem} key={4} value='주 4회'>주 4회</MenuItem>
                            <MenuItem className={styles.menuItem} key={5} value='주 5회'>주 5회</MenuItem>
                            <MenuItem className={styles.menuItem} key={6} value='주말근무'>주말근무</MenuItem>
                            <MenuItem className={styles.menuItem} key={7} value='주 7일'>주 7일 [근로기준법 제63조 적용업종]</MenuItem>
                            <MenuItem className={styles.menuItem} key={8} value='격일근무'>격일근무</MenuItem>
                        </TextField>
                        <TextField
                            select
                            label="근무시작시간"
                            required
                            fullWidth
                            className={styles.info}
                            variant="standard"
                            hiddenLabel={false}
                            defaultValue=""
                            color='success'
                            InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                            InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                            helperText={workTimeText}
                            FormHelperTextProps={{
                                className: styles.info
                            }}
                        >
                            { workTimeSelectMenuItem }
                        </TextField>
                        <TextField
                            select
                            label="근무종료시간"
                            required
                            fullWidth
                            className={styles.info}
                            variant="standard"
                            hiddenLabel={false}
                            defaultValue=""
                            color='success'
                            InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                            InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                            helperText={workTimeText}
                            FormHelperTextProps={{
                                className: styles.info
                            }}
                        >
                            { workTimeSelectMenuItem }
                        </TextField>
                        <FormGroup row={true} className={styles.moneyForm}>
                            <TextField
                                select
                                label="임금 유형"
                                required
                                className={styles.info}
                                variant="standard"
                                hiddenLabel={false}
                                defaultValue=""
                                color='success'
                                InputProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                                style={{width:'30%'}}
                            >
                                <MenuItem key={1} value="월급">월급</MenuItem>
                                <MenuItem key={2} value="일급">일급</MenuItem>
                                <MenuItem key={3} value="시급">시급</MenuItem>
                            </TextField>
                            <TextField
                                variant="standard"
                                label="임금"
                                color='success'
                                InputProps={{
                                    style: { fontFamily: 'pretendard', fontWeight: 500 },
                                    endAdornment: <InputAdornment position="end"><div className={styles.info}>만원</div></InputAdornment>
                                }}
                                style={{width:'70%'}}
                            />
                        </FormGroup>
                        <TextField
                            required
                            fullWidth
                            label="상여금별도"
                            id="fullWidth"
                            variant="standard"
                            InputProps={{
                                style: { fontFamily: 'pretendard', fontWeight: 500 },
                                endAdornment: <InputAdornment position="end"><div className={styles.info}>%</div></InputAdornment>
                            }}
                            InputLabelProps={{ style: { fontFamily: 'pretendard', fontWeight: 500 } }}
                            color='success'
                        />
                        <FormControl required>
                            <FormLabel focused={false} className={styles.menuItem}>임금 지급방법</FormLabel>
                            <RadioGroup>
                                <FormControlLabel value="근로자에게 직접지급" control={<Radio color="success" />} label={<div className={styles.menuItem}>근로자에게 직접지급</div>} />
                                <FormControlLabel value="근로자 명의 예금통장에 입금" control={<Radio color="success" />} label={<div className={styles.menuItem}>근로자 명의 에금통장에 입금</div>} />
                            </RadioGroup>
                        </FormControl>
                        <FormControl required>
                            <FormLabel focused={false} className={styles.menuItem}>사회보험적용여부</FormLabel>
                            <RadioGroup>
                                <FormControlLabel value="고용보험" control={<Checkbox color="success" />} label={<div className={styles.menuItem}>고용보험</div>} />
                                <FormControlLabel value="산재보험" control={<Checkbox color="success" />} label={<div className={styles.menuItem}>산재보험</div>} />
                                <FormControlLabel value="국민연금" control={<Checkbox color="success" />} label={<div className={styles.menuItem}>국민연금</div>} />
                                <FormControlLabel value="건강보험" control={<Checkbox color="success" />} label={<div className={styles.menuItem}>건강보험</div>} />
                                <Alert severity="info" className={styles.menuItem}>
                                    <AlertTitle className={styles.info}>사회보험적용여부 안내</AlertTitle>
                                    근로일수, 근로시간에 관계없이 <span style={{fontWeight: 600}}>1개월 미만으로 근무하는 경우 국민연금과 건강보험은 가입이 제외</span>됩니다.
                                    월 근로시간이 60시간 미만이라도 생업을 목적으로 <span style={{fontWeight: 600}}>3개월 이상 근무한다면, 4대보험 가입 대상</span>이 됩니다. 단, 근로시간에 상관없이 <span style={{fontWeight: 600}}>산재보험은 무조건 가입</span>해야합니다.
                                </Alert>
                            </RadioGroup>
                        </FormControl>
                        <FormControl required>
                            <FormLabel focused={false} className={styles.menuItem}>사업주 서명</FormLabel>
                            <SignatureCanvas ref={signCanvas} penColor='black' canvasProps={{className: styles.signCanvas}} redrawOnResize clearOnResize={false}/>
                            <Button style={{marginTop: '0.5rem'}} onClick={()=>signCanvas.current.clear()} color='success' className={styles.replayButton} variant="outlined" startIcon={<ReplayIcon />}>
                                서명 다시하기
                            </Button>
                        </FormControl>
                        <Button color='success' className={styles.sendButton} variant="contained" size="large">
                            근로계약서 작성완료 및 전송하기
                        </Button>
                    </Stack>
                </LocalizationProvider>
            </div>
        </>
    )
}

export default Create;