"use client"
import DisconnectPolicy from '@/components/layouts/policies/DisconnectPolicy';
import PoliciesLayout from '@/components/layouts/policies/PoliciesLayout';
import PrivacyPolicy from '@/components/layouts/policies/PrivacyPolicy';
import TermsAndConditions from '@/components/layouts/policies/TermsAndConditions';
import { clientAction } from '@/configs/redux/client-slice';
import { RootState } from '@/configs/redux/store';
import { PoliciesEnum } from '@/constants/enum';
import { useParams  } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Policies = () => {
  const {currentPolicies} = useSelector((state: RootState) => state.client)
  const pathname:any = useParams()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clientAction.setCurrentPolicies(pathname.name))
  }, [pathname, dispatch])
  

  return (
    <>
    <PoliciesLayout>
      {currentPolicies === PoliciesEnum.Terms && <TermsAndConditions/>}
      {currentPolicies === PoliciesEnum.DisconnectPolicies && <DisconnectPolicy/>}
      {currentPolicies === PoliciesEnum.PrivacyPolicies && <PrivacyPolicy/>}
    </PoliciesLayout>
    </>
  )
}

export default Policies