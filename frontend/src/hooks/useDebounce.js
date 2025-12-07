/**
 * useDebounce.js
 * ===============
 * Custom hook để debounce một giá trị.
 *
 * Debounce = Chờ một khoảng thời gian sau khi user ngừng thay đổi
 * trước khi sử dụng giá trị mới.
 *
 * Ví dụ: User gõ "python" nhanh
 * - Không debounce: Gọi API 6 lần (p, py, pyt, pyth, pytho, python)
 * - Có debounce 300ms: Chờ user ngừng gõ 300ms → Gọi API 1 lần (python)
 */

import { useState, useEffect } from "react";

function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set timeout để cập nhật debounced value
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: Clear timeout nếu value thay đổi trước khi delay kết thúc
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
