import React from 'react'
import EmployeeProfile from '../profile/EmployeeProfile'
import WorkingExperience from '../workingExperience/WorkingExperience'
import AppliedJobPostsList from '../appliedJobPosts/AppliedJobPostsList'


const EmployeeDashboard = () => {
  return (
    <>
    <EmployeeProfile/>
    <WorkingExperience/>
    <AppliedJobPostsList/>
    </>
  )
}

export default EmployeeDashboard