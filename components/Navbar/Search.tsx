"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState("");

  // ฟังการเปลี่ยนแปลงของ searchParams
  useEffect(() => {
    const currentSearch = searchParams.get("search") || "";
    setSearch(currentSearch);
  }, [searchParams]);

  // ฟังก์ชันสำหรับจัดการการค้นหา
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value.trim()) {
      params.set("search", encodeURIComponent(value));
    } else {
      params.delete("search");
    }
    router.replace(`/?${params.toString()}`);
  }, 250);

  return (
    <Input
      type="text"
      placeholder="Search Food..."
      className="max-w-xs"
      onChange={(e) => {
        const value = e.target.value;
        setSearch(value);
        handleSearch(value);
      }}
      value={search}
    />
  );
};

export default Search;
