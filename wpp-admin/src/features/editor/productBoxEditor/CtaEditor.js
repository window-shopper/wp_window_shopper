import React from 'react';
import { useSelector } from 'react-redux';
import TextFieldElement from '../TextFieldElement';
import {
  setCta1,
  setCta2,
  selectState,
} from '../editorSlice';

export function CtaEditor({ cta, setCta }) {
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <TextFieldElement item={cta} setItem={setCta} label="Text" keyName="text" />
    </div>
  );
}

export function Cta1Editor() {
  const { cta1 } = useSelector(selectState);
  return <CtaEditor cta={cta1} setCta={setCta1} />;
}
export function Cta2Editor() {
  const { cta2 } = useSelector(selectState);
  return <CtaEditor cta={cta2} setCta={setCta2} />;
}
