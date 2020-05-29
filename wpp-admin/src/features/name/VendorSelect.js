import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useSelector, useDispatch } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import TooltipWrapper from '../editor/TooltipWrapper';
import TextField from '../../components/TextField';
import {
  selectState,
  setCategory,
} from '../editor/editorSlice';
import {
  selectCategorys,
  addCategorys,
} from '../productBoxes/aggregatorSlice';

export default function CategorySelect() {
  const { category } = useSelector(selectState);
  const [newCategory, setNewCategory] = useState('');
  const [open, setOpen] = useState(false);
  const categorys = useSelector(selectCategorys);
  const dispatch = useDispatch();

  const menuItems = [
    <MenuItem style={{ width: 420 }} value="">
      <em>None</em>
    </MenuItem>,
    categorys.map((v) => (
      <MenuItem
        key={v}
        value={v}
      >
        {v}
      </MenuItem>
    )),
  ];

  return (
    <FormControl style={{ width: '100%', margin: '20px 0px' }}>
      <InputLabel>Category (optional)</InputLabel>
      <Select onChange={(e) => dispatch(setCategory(e.target.value))} value={category}>
        {menuItems}
      </Select>
      <TooltipWrapper label="You can use categories to make managing Product Boxes easier. An example of a category could be the vendor like 'Amazon', or you could create Product Boxes only for a specific event like 'Christmas Sale' and keep track of the ones you want to delete after the event if over.">
        <div
          style={{
            marginLeft: -5, marginTop: 20, display: 'flex', justifyContent: 'flex-start',
          }}
        >
          <Button color="primary" size="small" onClick={() => setOpen(!open)}>
            {!open && 'Add Category'}
            {open && 'Collapse'}
          </Button>
        </div>
      </TooltipWrapper>
      {open && (
      <div style={{ display: 'flex', width: '100%', marginTop: 10 }}>
        <TextField
          fullWidth
          onChange={(e) => setNewCategory(e.target.value)}
          value={newCategory}
          label="Category Name"
        />
        <Button
          size=""
          style={{ width: 240, marginLeft: 30 }}
          onClick={() => {
            if (!newCategory) return;
            dispatch(setCategory(newCategory));
            dispatch(addCategorys([newCategory]));
            setNewCategory('');
          }}
          variant="outlined"
          color="primary"
        >
          Add Category
        </Button>
      </div>
      )}
    </FormControl>
  );
}
