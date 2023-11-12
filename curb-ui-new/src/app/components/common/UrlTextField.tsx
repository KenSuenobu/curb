import {IconButton, TextField, TextFieldProps} from '@mui/material';
import {PreviewOutlined} from '@mui/icons-material';
import {OutlinedTextFieldProps} from '@mui/material/TextField/TextField';

export type IUrlTextField = TextFieldProps & {
  onUrlClick: () => any;
};

const UrlTextField = (props: IUrlTextField) => {
  const { onUrlClick, ...textFieldProps } = props;

  const handleUrlClick = () => {
    props.onUrlClick();
  }

  return (
    <TextField {...textFieldProps}
    InputProps={{
      endAdornment: (
        <IconButton onClick={handleUrlClick}>
          <PreviewOutlined/>
        </IconButton>
      ),
    }}/>
  );
}

export default UrlTextField;
