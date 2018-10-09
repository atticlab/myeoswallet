--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.10
-- Dumped by pg_dump version 9.6.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: myeoswallet; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE myeoswallet WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.utf8' LC_CTYPE = 'en_US.utf8';


\connect myeoswallet

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: myeoswallet; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA myeoswallet;


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: added_accounts; Type: TABLE; Schema: myeoswallet; Owner: -
--

CREATE TABLE myeoswallet.added_accounts (
    ada_id integer NOT NULL,
    ada_name character varying(12) NOT NULL,
    ada_timestamp timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: added_accounts_ada_id_seq; Type: SEQUENCE; Schema: myeoswallet; Owner: -
--

CREATE SEQUENCE myeoswallet.added_accounts_ada_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: added_accounts_ada_id_seq; Type: SEQUENCE OWNED BY; Schema: myeoswallet; Owner: -
--

ALTER SEQUENCE myeoswallet.added_accounts_ada_id_seq OWNED BY myeoswallet.added_accounts.ada_id;


--
-- Name: added_accounts ada_id; Type: DEFAULT; Schema: myeoswallet; Owner: -
--

ALTER TABLE ONLY myeoswallet.added_accounts ALTER COLUMN ada_id SET DEFAULT nextval('myeoswallet.added_accounts_ada_id_seq'::regclass);


--
-- Name: added_accounts added_accounts_pkey; Type: CONSTRAINT; Schema: myeoswallet; Owner: -
--

ALTER TABLE ONLY myeoswallet.added_accounts
    ADD CONSTRAINT added_accounts_pkey PRIMARY KEY (ada_id);


--
-- Name: added_accounts_ada_name_uindex; Type: INDEX; Schema: myeoswallet; Owner: -
--

CREATE UNIQUE INDEX added_accounts_ada_name_uindex ON myeoswallet.added_accounts USING btree (ada_name);


--
-- PostgreSQL database dump complete
--

