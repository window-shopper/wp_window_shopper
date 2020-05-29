// import React from 'react';
// import Paper from '@material-ui/core/Paper';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import { useSelector, useDispatch } from 'react-redux';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import TextField from '../../components/TextField';
// import {
//   selectName,
//   selectShortcode,
//   setName,
//   setShortcode,
// } from '../editor/editorSlice';
// import {
//   selectState,
// } from '../stepper/stepSlice';


// export function Name() {
//   const { step } = useSelector(selectState);
//   const name = useSelector(selectName);
//   const shortcode = useSelector(selectShortcode);
//   const dispatch = useDispatch();

//   if (step !== 2) return null;
//   return (
//     <div style={{
//       width: '100%', display: 'flex', justifyContent: 'center', paddingTop: 300,
//     }}
//     >
//       <Paper style={{ padding: 30 }} elevation={1}>
//         <Typography variant="h5">Choose a Name</Typography>
//         <Divider style={{ marginTop: 10, marginBottom: 25 }} />
//         <TextField inputProps={{ style: { textAlign: 'center' } }} fullWidth style={{ marginBottom: 20 }} onChange={(e) => dispatch(setName(e.target.value))} value={name} label="Name" />
//         <TextField
//           fullWidth
//           InputProps={{
//             startAdornment: <InputAdornment position="start">[</InputAdornment>,
//             endAdornment: <InputAdornment position="start">]</InputAdornment>,
//           }}
//           inputProps={{ style: { textAlign: 'center' } }}
//           onChange={(e) => dispatch(setShortcode(e.target.value))}
//           value={shortcode}
//           label="Shortcode"
//         />
//       </Paper>
//     </div>
//   );
// }
