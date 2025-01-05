import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useSearchHotels} from "./hostelAPI.js";
import SearchResults from "../../ui/SearchResults.jsx";
import FilterBy from "./filter/FilterBy.jsx";

function SearchHotels() {
    const search = useSelector((state) => (state.search));
    const [searchParams, setSearchParams] = useState({
        ...search,
        ratings: [],
        types: [],
        facilities: [],
        sorting: ''
    })
    const { data, refetch } = useSearchHotels(searchParams)

    function handleChanges(data){
        setSearchParams((prevState) => ({...prevState, ...data}))
    }

    useEffect(() => {
        refetch()
    }, [searchParams])

    useEffect(() => {
        setSearchParams((prevState) => ({...prevState, ...search}))
    }, [search])




    return (
        <div className={'grid  lg:grid-cols-[250px_1fr]'}>
            <FilterBy onFilterChange={handleChanges} searchParams={searchParams} />
            <SearchResults results={data} destination={search.destination} onChange={handleChanges}/>
        </div>
    );
}

export default SearchHotels;