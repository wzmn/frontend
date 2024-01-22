import ComboBox, { ComboBoxDataT } from "components/combo-box";
import React from "react";
import * as styles from "./styles.module.scss";

type CombineComboT<T1, T2> = {
  data1: ComboBoxDataT[];
  data2: ComboBoxDataT[];
  handleSelectData1: (e: T1 & ComboBoxDataT) => void;
  handleSelectData2: (e: T2 & ComboBoxDataT) => void;
};

function CombineCombo<T1, T2>({
  data1,
  data2,
  handleSelectData1,
  handleSelectData2,
}: CombineComboT<T1, T2>) {
  return (
    <div className="flex">
      <div className={`w-32 ${styles.stateFilter}`}>
        <ComboBox
          colorVarient="gray"
          placeholder="select state"
          data={data1}
          contClass={styles.lCont}
          className={styles.boxInput}
          readOnly={true}
          handleSelect={handleSelectData1}
        />
      </div>
      <div className="w-40">
        <ComboBox
          data={data2}
          contClass={styles.rCont}
          className={styles.boxInput}
          handleSelect={handleSelectData2}
        />
      </div>
    </div>
  );
}

export default CombineCombo;
