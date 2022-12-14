interface Mapper<T> {
    toDomain(raw: any): T;
}

export default Mapper;