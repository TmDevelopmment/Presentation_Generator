"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { useSlideStore } from '@/store/useSlideStore'
import React, { useEffect, useState } from 'react'

type Props = {
    content: string[][]
    onChange: (newContent: string[][]) => void
    isPreview?: boolean
    isEditable?: boolean
    initialRowSize?: number
    initialColSize?: number
}

const TableComponent = ({
    content,
    onChange,
    isPreview,
    isEditable,
    initialRowSize,
    initialColSize,
}: Props) => {

    const { currentTheme } = useSlideStore();
    const [rowSizes, setRowSizes] = useState<number[]>([]);
    const [colSizes, setColSizes] = useState<number[]>([]);
    const [tableData, setTableData] = useState<string[][]>(() => {
        if (content.length === 0 || content[0].length === 0) {
            return Array(initialRowSize).fill(Array(initialColSize).fill(''));
        }
        return content;
    });

    const handleResizeCol = (index: number, newSize: number) => {
        if (!isEditable) return;
        const newSizes = [...colSizes];
        newSizes[index] = newSize;
        setColSizes(newSizes);
    }

    const updateCell = (rowIndex: number, cellIndex: number, value: string) => {

        if (!isEditable) return;
        const newData = tableData.map((row, rIndex) => 
            rIndex === rowIndex
            ? row.map((cell, cIndex) => (cIndex === cellIndex ? value : cell))
            : row
        )
        setTableData(newData);
        onChange(newData);
    }

    useEffect(() => {
        setRowSizes(new Array(tableData.length).fill(100 / tableData.length))
        setColSizes(new Array(tableData[0].length).fill(100 / tableData[0].length))
    }, [tableData])

    if (isPreview)
        return (
            <div className="w-full overflow-x-auto text-xs">
                <table className="w-full">
                    <thead>
                        <tr>
                            {tableData[0].map((cell, index) => (
                                <th
                                    key={index}
                                    className="p-2 border"
                                    style={{ width: `${colSizes[index]}%` }}
                                >
                                    {cell || 'Type here'}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.slice(1).map((row, rowIndex) => (
                            <tr key={rowIndex}
                                style={{ height: `${rowSizes[rowIndex + 1]}%` }}>
                                {row.map((cell, cellIndex) => (
                                    <td
                                        key={cellIndex}
                                        className="p-2 border"
                                        style={{ width: `${colSizes[cellIndex]}%` }}
                                    >
                                        {cell || 'Type here'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        )

    return <div
        className="w-full h-full relative"
        style={{
            background: currentTheme.gradientBgColor || currentTheme.backgroundColor,
            borderRadius: '8px',
        }}>
        <ResizablePanelGroup direction="vertical"
            className={`h-full w-full rounded-lg border 
        ${initialColSize === 2
                    ? 'min-h-25'
                    : initialColSize === 3
                        ? 'min-h-37.5'
                        : initialColSize === 4
                            ? 'min-h-50'
                            : 'min-h-25'}`}
            onLayout={(sizes) => setRowSizes(sizes)}
        >
            {tableData.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                    {rowIndex > 0 && <ResizableHandle />}
                    <ResizablePanelGroup
                        direction="horizontal"
                        className="w-full h-full"
                        onLayout={(sizes) => setColSizes(sizes)}
                    >
                        {row.map((cell, cellIndex) => (
                            <React.Fragment key={cellIndex}>
                                {cellIndex > 0 && <ResizableHandle />}
                                <ResizablePanel
                                    defaultSize={colSizes[cellIndex]}
                                    onResize={(size) => handleResizeCol(cellIndex, size)}
                                    className="w-full h-full min-h-9"
                                >
                                    <div className="w-full h-full relative min-h-9">
                                        <input
                                        value={cell}
                                        onChange={(e) => 
                                            updateCell(rowIndex, cellIndex, e.target.value)
                                        }
                                        className="w-full h-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        style={{
                                            color: currentTheme.fontColor,
                                        }}
                                        placeholder="Type here"
                                        readOnly={!isEditable}
                                        >
                                        </input>
                                    </div>
                                </ResizablePanel>
                            </React.Fragment>
                        ))}
                    </ResizablePanelGroup>
                </React.Fragment>
            ))}
        </ResizablePanelGroup>

    </div>
}

export default TableComponent