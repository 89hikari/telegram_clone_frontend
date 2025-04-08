import { useAppSelector } from "@/hooks/stateHooks";
import { RootState } from "@/store";
import { Select, Spin } from "antd";
import type { SelectProps } from "antd/es/select";
import debounce from "lodash/debounce";
import React, { useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface DebounceSelectProps<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, "options" | "children"> {
  fetchOptions: (search: string) => Promise<ValueType[]>;
  debounceTimeout?: number;
}

function DebounceSelect<
  ValueType extends {
    key?: string;
    label: React.ReactNode;
    value: string | number;
  } = any
>({
  fetchOptions,
  debounceTimeout = 800,
  ...props
}: DebounceSelectProps<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState<ValueType[]>([]);
  const fetchRef = useRef(0);
  const navigate = useNavigate();

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);

      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);

  const onSelect = (value: ValueType | any) => {
    navigate(`/chat/${value.value}`);
    setOptions([]);
  };

  return (
    <Select
      labelInValue
      onSelect={(e) => onSelect(e)}
      allowClear
      value={[]}
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}

// Usage of DebounceSelect
interface UserValue {
  label: string;
  value: number;
}

const DebaunceUserSearch: React.FC = () => {
  const { token } = useAppSelector((state: RootState) => state.global);

  const fetchUserList = async (username: string): Promise<UserValue[]> => {
    return fetch(`users?search=${username}&limit=10`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((body) =>
        body.map((elem: { name: string; email: string; id: number }) => ({
          label: elem.name,
          value: elem.id,
        }))
      );
  };

  return (
    <DebounceSelect
      mode="multiple"
      placeholder="Search users here!"
      fetchOptions={fetchUserList}
      style={{ width: "100%" }}
    />
  );
};

export default DebaunceUserSearch;
