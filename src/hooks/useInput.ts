import { ChangeEvent, useCallback, useState } from 'react';

interface initialFormType {
  [key: string]: unknown; //any
}

// 제네릭으로 개선 => 타입을 동적으로 바꿀 수 있다.
const useInput = <T extends initialFormType>(initialForm: T) => {
  const [form, setForm] = useState<T>(initialForm);

  const onChange = useCallback(
    (
      e:
        | ChangeEvent<HTMLInputElement>
        | ChangeEvent<HTMLSelectElement>
        | ChangeEvent<HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setForm((preForm) => ({ ...preForm, [name]: value }));
    },
    []
  );
  const reset = useCallback(() => setForm(initialForm), [initialForm]);

  return { form, setForm, onChange, reset }; // 객체로 내보내는 게 좋다
};

export default useInput;
