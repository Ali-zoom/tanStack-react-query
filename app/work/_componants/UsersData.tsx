"use client";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useGetUsersPagination, { User } from "@/app/hooks/useGetUsersPagination";
import { useState } from "react";

const UsersData = () => {
  const router = useRouter();

//   const searchParams = useSearchParams();
//   const rawPage = Number(searchParams.get("page") ?? "1");
//   const currentPage =
//     Number.isSafeInteger(rawPage) && rawPage > 0 ? rawPage : 1;
  const limit = 10;

const [currentPage,setCurrentPage]=useState(1)
  const { data, isPending, isError, error, isFetching } = useGetUsersPagination(
    currentPage,
    limit,
  );

  function goToPage(page: number) {
    if (page < 1) return;
    // const params = new URLSearchParams(searchParams);

    // params.set("page", String(page));

    // router.push(`?${params.toString()}`);
    setCurrentPage(page)
  }

  if (isPending) return <p>Loading users...</p>;

  if (isError) {
    return <p className="text-red-500">{error.message}</p>;
  }

  const { users, totalUsers, totalPages } = data;
  return (
    <div>
      <h2 className="text-xl font-semibold">Users ({totalUsers})</h2>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={2} className="text-center">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user: User) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name ?? "—"}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* pagination start here */}
      {totalPages > 0 && (
        <div className="space-y-3">
          <p className="text-center text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  aria-disabled={currentPage <= 1}
                  onClick={(event) => {
                    event.preventDefault();
                    if (currentPage > 1) {
                      goToPage(currentPage - 1);
                    }
                  }}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (page) =>
                    page === 1 ||
                    page === totalPages ||
                    Math.abs(page - currentPage) <= 1,
                )
                .map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={page === currentPage}
                      onClick={(event) => {
                        event.preventDefault();
                        goToPage(page);
                      }}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  aria-disabled={currentPage >= totalPages}
                  onClick={(event) => {
                    event.preventDefault();
                    if (currentPage < totalPages) {
                      goToPage(currentPage + 1);
                    }
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default UsersData;
