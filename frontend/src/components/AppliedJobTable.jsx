import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'

const AppliedJobTable = () => {
    return (
        <div>
            <Table>
                <TableCaption>List of Your applied Job</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right ">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {

                        [1, 2].map((item,i)=>(
                            <TableRow key={i}>
                                <TableCell>10-10-2003</TableCell>
                                <TableCell>FrontEnd</TableCell>
                                <TableCell>Microsoft</TableCell>
                                <TableCell className={"text-right"}><Badge>Selected</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable
