/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import ILyndaFriend from "../interfaces/interfaces";

interface IFriendResult {
  findFriend: ILyndaFriend;
}

interface IVariableInput {
  input: string;
}

const GET_FRIEND = gql`
  query findFriend($input: String) {
    findFriend(input: $input) {
      id
      email
      age
      firstName
      lastName
      gender
    }
  }
`;

export default function FindFriend() {
  const [input, setInput] = useState("");
  const [findFriend, { loading, called, data }] = useLazyQuery<
    IFriendResult,
    IVariableInput
  >(GET_FRIEND, { fetchPolicy: "cache-and-network" });

  const fetchFriend = () => {
    findFriend({ variables: { input: input } });
  };

  return (
    <div>
      ID:
      <input
        type="txt"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      &nbsp; <button onClick={fetchFriend}>Find Friend</button>
      <br />
      <br />
      {called && loading && <p>loading...</p>}
      {data && (
        <div>
          <p>{data.findFriend.firstName}</p>
          <p>{data.findFriend.lastName}</p>
          <p>{data.findFriend.email}</p>
          <p>{data.findFriend.gender}</p>
        </div>
      )}
    </div>
  );
}
