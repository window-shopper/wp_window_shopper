import React from 'react';
import { useSelector } from 'react-redux';
import Help from './features/help';
import { routes } from './consts';
import { SideDrawer } from './features/drawer/Drawer';
import { CreationStepper } from './features/stepper/Stepper';
import { Previews } from './features/previews/previews';
import Editor from './features/editor/editor';
import { NameTemplate } from './features/name/NameTemplate';
import { NameProductBox } from './features/name/NameProductBox';
import { Templates } from './features/templates/templates';
import { ProductBoxes } from './features/productBoxes/productBoxes';
import { selectStep } from './features/stepper/stepSlice';
import {
  selectCurrentPage,
} from './routerSlice';

function App() {
  const currentPage = useSelector(selectCurrentPage);
  const step = useSelector(selectStep);
  return (
    <div style={{ position: 'relative', width: '100%' }} className="App">
      <SideDrawer>
        <div style={{ width: '100%', position: 'relative' }}>
          {currentPage === routes.product_boxes && (
            <>
              <ProductBoxes />
            </>
          )}
          {currentPage === routes.templates && (
            <Templates />
          )}
          {currentPage === routes.create_new_template && (
          <CreationStepper>
            <Previews />
            {step === 1 && <Editor editorKind="template" />}
            <NameTemplate />
          </CreationStepper>
          )}
          {currentPage === routes.create_new_product_box && (
          <CreationStepper>
            <Templates selectable />
            {step === 1 && <Editor editorKind="productBox" />}
            <NameProductBox />
          </CreationStepper>
          )}
          {currentPage === routes.help && (
          <Help />
          )}
        </div>
      </SideDrawer>
    </div>
  );
}

export default App;
