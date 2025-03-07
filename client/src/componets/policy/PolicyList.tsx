import { MultiSelect, NumberInput, TextInput } from '@mantine/core';
import { DataTable, DataTableColumn, DataTableSortStatus } from 'mantine-datatable';
import { getPolicies } from '../../api';
import { useEffect, useState } from 'react';
import { Policy, PolicyTypes } from '../../types/global';
import urlUtils from '../../utils/urlUtils';
import { useDebouncedValue } from '@mantine/hooks';
import { CiSearch } from "react-icons/ci";

export default function PolicyList() {

    const policyTypes: PolicyTypes[] = ['Health', 'Term Life', 'Vehicle']
    const [isLoading, setIsLoading] = useState(false)

    const PAGE_SIZE = 10;
    const [page, setPage] = useState(1);

    const [data, setData] = useState<Policy[]>([])
    const [records, setRecords] = useState(data.slice(0, PAGE_SIZE));
    const [search, setSearch] = useState('')
    const [selectedType, setSelectedType] = useState<string[]>([])
    const [debouncedQuery] = useDebouncedValue(search, 200);

    // for sort
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus<Policy>>({
        columnAccessor: 'name',
        direction: 'asc',
    });

    // filter
    const [maxPremium, setMaxPremium] = useState('')
    const [minPremium, setMinPremium] = useState('')

    const [minCoverage, setMinCoverage] = useState('')


    useEffect(() => {
        fetchData()
    }, [debouncedQuery])

    function updatePage(data: Policy[], page: number) {
        const from = (page - 1) * PAGE_SIZE;
        const to = from + PAGE_SIZE;
        setRecords(data.slice(from, to));
        setPage(page)
    }

    async function fetchData(sort?: DataTableSortStatus<Policy>) {

        try {
            setIsLoading(true)
            let query = ''
            if (search) query = urlUtils.updateQueryParam(query, 'search', search)
            if (selectedType.length) query = urlUtils.updateQueryParam(query, 'type', selectedType.join(','))
            if (minPremium) query = urlUtils.updateQueryParam(query, 'min-pre', minPremium)
            if (maxPremium) query = urlUtils.updateQueryParam(query, 'max-pre', maxPremium)
            if (minCoverage) query = urlUtils.updateQueryParam(query, 'min-cov', minCoverage)

            //handle sort
            if (sort) {
                if (sort?.columnAccessor !== sortStatus.columnAccessor || sort.direction !== sortStatus.direction) {
                    query = urlUtils.updateQueryParam(query, 'sort', sort.columnAccessor)
                    query = urlUtils.updateQueryParam(query, 'sort-dir', sort.direction)
                    setSortStatus(sort)
                }
            }

            const response = await getPolicies(query)
            setData(response.results)
            updatePage(response.results, 1)
            setPage(1)
        } catch (error) {
            console.log('err', error)
        } finally { setIsLoading(false) }
    }


    const columns: DataTableColumn<Policy>[] = [
        {
            accessor: 'id',
            // this column has a custom title
            title: '#',
            // right-align column
            // textAlign: 'right',
        },
        {
            accessor: 'name',
            sortable: true,
        },
        {
            accessor: 'type',
            filter: () => {
                return <div className='flex items-center'>
                    <MultiSelect
                        label="Policy Types"
                        // description=""
                        data={policyTypes}
                        value={selectedType}
                        placeholder="Search Types…"
                        onChange={setSelectedType}
                        // leftSection={<IconSearch size={16} />}
                        comboboxProps={{ withinPortal: false }}
                        clearable
                        searchable
                    />
                    <div>
                        <CiSearch
                            className='bg-blue-500 text-white hover:bg-blue-700 rounded-lg p-1 size-8'
                            onClick={() => fetchData()}
                        />

                    </div>
                </div>

            },
            filtering: selectedType.length > 0,

        },
        {
            accessor: 'premium',
            sortable: true,
            filter: () => {
                return <div className='flex'>
                    <div>

                        <div className='flex gap-2 items-center p-1'>
                            <label htmlFor="min">Min</label>
                            <NumberInput id='min'
                                value={minPremium}
                                onChange={e => setMinPremium(String(e))}
                            />
                        </div>
                        <div className='flex gap-2 items-center p-1'>
                            <label htmlFor="max">Max</label>
                            <NumberInput id='max'
                                value={maxPremium}
                                onChange={e => setMaxPremium(String(e))}
                            />
                        </div>
                    </div>
                    <div >
                        <CiSearch
                            className='bg-blue-500 text-white hover:bg-blue-700 rounded-lg p-1 size-8'
                            onClick={() => fetchData()}
                        />

                    </div>
                </div>
            },
            filtering: minPremium !== '' || maxPremium !== '',
        },
        {
            accessor: 'coverage',
            sortable: true,
            filter: () => {
                return <div className='flex'>
                    <div className='flex gap-2 items-center p-1'>
                        <label htmlFor="min-coverage">Min</label>
                        <NumberInput id='min-coverage'
                            value={minCoverage}
                            onChange={e => setMinCoverage(String(e))}
                        />
                        <div >
                            <CiSearch
                                className='bg-blue-500 text-white hover:bg-blue-700 rounded-lg p-1 size-8'
                                onClick={() => fetchData()}
                            />

                        </div>
                    </div>
                </div>
            },
            filtering: minCoverage !== '',
        },
    ]


    return (
        < >
            {
                isLoading &&
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                    <div className="loader border-t-transparent border-solid rounded-full border-4 border-blue-500 w-16 h-16 animate-spin"></div>
                </div>
            }

            <div className='flex justify-center h-full'>
                <div className='max-w-[1200px] w-full mt-5'>
                    <h3 className='text-2xl text-white font-extrabold'>Premiums</h3>
                    <div className='p-3 flex justify-end'>
                        <TextInput
                            placeholder='Search'
                            classNames={{ input: 'p-2' }}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <DataTable
                        withTableBorder
                        borderRadius="sm"
                        withColumnBorders
                        striped
                        highlightOnHover
                        // provide data
                        records={records}
                        sortStatus={sortStatus}
                        // onSortStatusChange={setSortStatus}
                        onSortStatusChange={fetchData}
                        // define columns
                        columns={columns}
                        totalRecords={data.length}
                        recordsPerPage={PAGE_SIZE}
                        page={page}
                        onPageChange={(p) => updatePage(data,p)}
                    />
                </div>
            </div>
        </>
    );
}

