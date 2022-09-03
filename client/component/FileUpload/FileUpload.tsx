import { Grid, Box } from "@mui/material";
import React from "react";

interface FileUploadProps {
    text: string;
    accept: string;
    click: Function;
}

const FileUpload: React.FC<FileUploadProps> = ({ text, accept, click }) => {

    const inputRef = React.useRef<HTMLInputElement>(null);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.files && click(e.target.files[0]);
    }

    return (<Grid height={295} padding={3} >
        <Box onClick={() => inputRef.current?.click()} height={260} style={{ display: 'flex', cursor: 'pointer', flexDirection: 'column', alignItems: 'center', borderStyle: 'dashed', borderColor: '#0070f3' }}>
            <input
                type={'file'}
                accept={accept}
                style={{ display: 'none' }}
                ref={inputRef}
                onChange={onChange}
            />
            <h3 style={{ marginTop: 35 }}>{text}</h3>
            <div style={{ marginBottom: 15 }}>Максимальный размер файла<b> 10МБ</b></div>
            <img width={100} height={100} src="https://roomsee.ru/upload/articles/images/19540/219-2198394_empire-building-easy-smart-contract-creation-content-icon-blue.png"></img>
        </Box>
    </Grid>)
}

export default FileUpload;