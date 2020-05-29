import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import api from '../../api';
import DeleteButton from '../productBoxes/DeleteButton';
import TextField from '../../components/TextField';
import {
  selectState,
  setCategory,
} from '../editor/editorSlice';
import TooltipWrapper from '../editor/TooltipWrapper';
import CategoryLoader from './CategoryLoader';

const tooltipLabel = "You can use categories to make managing Product Boxes easier. An example of a category could be the vendor like 'Amazon', or you could create Product Boxes only for a specific event like 'Christmas Special' and keep track of the ones you want to delete after the event if over.";

export default function RadioButtonsGroup() {
  const dispatch = useDispatch();
  const { category } = useSelector(selectState);
  const [newCategory, setNewCategory] = useState('');

  return (
    <div style={{ paddingTop: 20, position: 'relative' }}>
      <CategoryLoader>
        {(categories, refetch, triggerLoading, triggerError) => (
          <>
            <FormControl style={{ width: '100%' }} component="fieldset">
              <TooltipWrapper label={tooltipLabel}>
                <FormLabel style={{ paddingBottom: 5 }} component="legend">Category</FormLabel>
              </TooltipWrapper>
              <RadioGroup value={category} onChange={(e) => dispatch(setCategory(e.target.value))}>
                <Paper
                  variant="outlined"
                  style={{
                    overflowY: 'scroll', overflowX: 'hidden', width: '100%', maxHeight: '20vh', margin: 'auto', marginTop: 10,
                  }}
                >
                  <FormControlLabel style={{ width: '94%', paddingLeft: 5, margin: 'auto' }} value="" control={<Radio />} label={<em>None</em>} />
                  {categories.map((cat, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex', justifyConent: 'space-between', width: '94%', margin: 'auto',
                      }}
                    >
                      <FormControlLabel style={{ flex: 1, paddingLeft: 5 }} value={cat.category} control={<Radio color="primary" />} label={cat.category} />
                      <div style={{ marginTop: 4 }}>
                        <DeleteButton
                          hideLabel
                          deleteFunc={async () => {
                            let error;
                            const setErr = (err) => {
                              console.log(err);
                              error = err;
                            };
                            await api.deleteCategory(cat.id).catch(setErr);
                            if (error) {
                              triggerError(error);
                            }
                            if (cat.category === category) {
                              dispatch(setCategory(''));
                            }
                            refetch();
                          }}
                          size="medium"
                        />
                      </div>
                    </div>
                  ))}
                </Paper>
              </RadioGroup>
            </FormControl>
            <div style={{
              display: 'flex', width: '99%', margin: 'auto', marginTop: 30,
            }}
            >
              <TextField
                fullWidth
                onChange={(e) => setNewCategory(e.target.value)}
                value={newCategory}
                label="Category Name"
              />
              <Button
                style={{ width: 240, marginLeft: 30 }}
                onClick={async () => {
                  if (!newCategory) return;
                  triggerLoading();
                  let error;
                  const setErr = (err) => {
                    console.log(err);
                    error = err;
                  };
                  await api.postCategory({ category: newCategory }).catch(setErr);
                  if (error) {
                    setNewCategory('');
                    triggerError(error);
                    return;
                  }
                  dispatch(setCategory(newCategory));
                  setNewCategory('');
                  refetch();
                }}
                variant="outlined"
                color="primary"
              >
                Add Category
              </Button>
            </div>
          </>
        )}
      </CategoryLoader>
    </div>
  );
}
