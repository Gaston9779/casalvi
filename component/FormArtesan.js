import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import UserFormLib from "./UserForm";

const schema = z.object( {
  name: z.string().min( 4 ),
  email: z.string().email().min( 2 ),
  agency: z.string(),
} );

export default function FormArtesan ()
{
  const [ page, setPage ] = useState( 0 )
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm( {
    resolver: zodResolver( schema )
  } );

  const processForm = async ( data ) =>
  {
    //    await fetch("/api/form", {
    //      method: "POST",
    //      body: JSON.stringify(data)
    //    });
    setPage( page + 1 )



  };
  const backForm = () =>
  {
    setPage( 0 )
  }
  useEffect( () =>
  {
    console.log( page, 'ape' )
  }, [ page ] )
  return (
    <div style={ { backgroundColor: 'white', padding: 20, borderRadius: 5, boxShadow: '1px 1px 13px lightgrey' } }>
      <UserFormLib />

    </div>
  );
}

