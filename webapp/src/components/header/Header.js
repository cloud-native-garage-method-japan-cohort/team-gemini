import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { Button } from "@material-ui/core";
import Style from './Header.module.css';
import LinksDialog from '../linksDialog/LinksDialog';
import { documentLinks } from '../../utils/documentLinks'

const Header = () => {
  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  return (
    <div className={Style.header}>
      <div className={Style.item}>
        <Link to='/'> 営業資料検索くん </Link>
        <Button variant="outlined" color="primary" onClick={openDialog}>使用ドキュメント一覧</Button>
      </div>
      <LinksDialog open={open} title="使用ドキュメント一覧" links={documentLinks} closeDialog={closeDialog} />
    </div>
  )
}

export default Header
