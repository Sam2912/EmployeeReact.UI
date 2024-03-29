import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Decimal: { input: any; output: any; }
};

export enum Department {
  Hr = 'HR',
  It = 'IT',
  Marketing = 'MARKETING',
  Operations = 'OPERATIONS',
  Sales = 'SALES'
}

export type Employee = FullTimeEmployeeType | PartTimeEmployeeType;

export type EmployeeDeleteInput = {
  employeeId?: InputMaybe<Scalars['Int']['input']>;
};

export type EmployeeInput = {
  fullTimeEmployeeInput?: InputMaybe<FullTimeEmployeeInput>;
  partTimeEmployeeInput?: InputMaybe<PartTimeEmployeeInput>;
};

export type EmployeeMutation = {
  __typename?: 'EmployeeMutation';
  addEmployee?: Maybe<IEmployee>;
  deleteEmployee?: Maybe<IEmployee>;
  updateEmployee?: Maybe<IEmployee>;
};


export type EmployeeMutationAddEmployeeArgs = {
  create: EmployeeInput;
};


export type EmployeeMutationDeleteEmployeeArgs = {
  delete: EmployeeDeleteInput;
};


export type EmployeeMutationUpdateEmployeeArgs = {
  update: EmployeeUpdateInput;
};

export type EmployeeQuery = {
  __typename?: 'EmployeeQuery';
  employee?: Maybe<Employee>;
  employees?: Maybe<Array<Maybe<Employee>>>;
  employeesWithInterface?: Maybe<Array<Maybe<IEmployee>>>;
  filteredEmployee?: Maybe<Array<Maybe<Employee>>>;
};


export type EmployeeQueryEmployeeArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type EmployeeQueryFilteredEmployeeArgs = {
  dept?: InputMaybe<Department>;
  status?: InputMaybe<Status>;
};

export enum EmployeeTypeEnum {
  FullTime = 'FULL_TIME',
  PartTime = 'PART_TIME'
}

export type EmployeeUpdateInput = {
  fullTimeEmployeeInput?: InputMaybe<FullTimeEmployeeInput>;
  partTimeEmployeeInput?: InputMaybe<PartTimeEmployeeInput>;
};

export type FullTimeEmployeeInput = {
  department: Department;
  id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  salary?: InputMaybe<Scalars['Float']['input']>;
  status: Status;
  type: Type;
};

export type FullTimeEmployeeType = IEmployee & {
  __typename?: 'FullTimeEmployeeType';
  department?: Maybe<Department>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  salary: Scalars['Decimal']['output'];
  status?: Maybe<Status>;
  type: EmployeeTypeEnum;
};

export type IEmployee = {
  department?: Maybe<Department>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  status?: Maybe<Status>;
};

export type PartTimeEmployeeInput = {
  department: Department;
  hourlyRate?: InputMaybe<Scalars['Float']['input']>;
  id?: InputMaybe<Scalars['Int']['input']>;
  name: Scalars['String']['input'];
  status: Status;
  type: Type;
};

export type PartTimeEmployeeType = IEmployee & {
  __typename?: 'PartTimeEmployeeType';
  department?: Maybe<Department>;
  hourlyRate: Scalars['Decimal']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  status?: Maybe<Status>;
  type: EmployeeTypeEnum;
};

/** Employee status */
export enum Status {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export enum Type {
  FullTime = 'FULL_TIME',
  PartTime = 'PART_TIME'
}

export type AddEmployeeMutationVariables = Exact<{
  create: EmployeeInput;
}>;


export type AddEmployeeMutation = { __typename?: 'EmployeeMutation', addEmployee?: { __typename?: 'FullTimeEmployeeType', id: number, name: string, department?: Department | null, status?: Status | null, salary: any, type: EmployeeTypeEnum } | { __typename?: 'PartTimeEmployeeType', id: number, name: string, department?: Department | null, status?: Status | null, hourlyRate: any, type: EmployeeTypeEnum } | null };

export type GetEmployeesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetEmployeesQuery = { __typename?: 'EmployeeQuery', employees?: Array<{ __typename: 'FullTimeEmployeeType', id: number, name: string, department?: Department | null, status?: Status | null, salary: any, type: EmployeeTypeEnum } | { __typename: 'PartTimeEmployeeType', id: number, name: string, department?: Department | null, status?: Status | null, hourlyRate: any, type: EmployeeTypeEnum } | null> | null };

type EmployeeDetails_FullTimeEmployeeType_Fragment = { __typename?: 'FullTimeEmployeeType', id: number, name: string, department?: Department | null, status?: Status | null, salary: any, type: EmployeeTypeEnum };

type EmployeeDetails_PartTimeEmployeeType_Fragment = { __typename?: 'PartTimeEmployeeType', id: number, name: string, department?: Department | null, status?: Status | null, hourlyRate: any, type: EmployeeTypeEnum };

export type EmployeeDetailsFragment = EmployeeDetails_FullTimeEmployeeType_Fragment | EmployeeDetails_PartTimeEmployeeType_Fragment;

export const EmployeeDetailsFragmentDoc = gql`
    fragment EmployeeDetails on Employee {
  ... on IEmployee {
    id
    name
    department
    status
  }
  ... on FullTimeEmployeeType {
    id
    name
    department
    status
    salary
    type
  }
  ... on PartTimeEmployeeType {
    id
    name
    department
    status
    hourlyRate
    type
  }
}
    `;
export const AddEmployeeDocument = gql`
    mutation AddEmployee($create: EmployeeInput!) {
  addEmployee(create: $create) {
    ... on IEmployee {
      id
      name
      department
      status
    }
    ... on FullTimeEmployeeType {
      salary
      type
    }
    ... on PartTimeEmployeeType {
      hourlyRate
      type
    }
  }
}
    `;
export type AddEmployeeMutationFn = Apollo.MutationFunction<AddEmployeeMutation, AddEmployeeMutationVariables>;

/**
 * __useAddEmployeeMutation__
 *
 * To run a mutation, you first call `useAddEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEmployeeMutation, { data, loading, error }] = useAddEmployeeMutation({
 *   variables: {
 *      create: // value for 'create'
 *   },
 * });
 */
export function useAddEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<AddEmployeeMutation, AddEmployeeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddEmployeeMutation, AddEmployeeMutationVariables>(AddEmployeeDocument, options);
      }
export type AddEmployeeMutationHookResult = ReturnType<typeof useAddEmployeeMutation>;
export type AddEmployeeMutationResult = Apollo.MutationResult<AddEmployeeMutation>;
export type AddEmployeeMutationOptions = Apollo.BaseMutationOptions<AddEmployeeMutation, AddEmployeeMutationVariables>;
export const GetEmployeesDocument = gql`
    query GetEmployees {
  employees {
    __typename
    ...EmployeeDetails
  }
}
    ${EmployeeDetailsFragmentDoc}`;

/**
 * __useGetEmployeesQuery__
 *
 * To run a query within a React component, call `useGetEmployeesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmployeesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmployeesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEmployeesQuery(baseOptions?: Apollo.QueryHookOptions<GetEmployeesQuery, GetEmployeesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEmployeesQuery, GetEmployeesQueryVariables>(GetEmployeesDocument, options);
      }
export function useGetEmployeesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEmployeesQuery, GetEmployeesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEmployeesQuery, GetEmployeesQueryVariables>(GetEmployeesDocument, options);
        }
export function useGetEmployeesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetEmployeesQuery, GetEmployeesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEmployeesQuery, GetEmployeesQueryVariables>(GetEmployeesDocument, options);
        }
export type GetEmployeesQueryHookResult = ReturnType<typeof useGetEmployeesQuery>;
export type GetEmployeesLazyQueryHookResult = ReturnType<typeof useGetEmployeesLazyQuery>;
export type GetEmployeesSuspenseQueryHookResult = ReturnType<typeof useGetEmployeesSuspenseQuery>;
export type GetEmployeesQueryResult = Apollo.QueryResult<GetEmployeesQuery, GetEmployeesQueryVariables>;