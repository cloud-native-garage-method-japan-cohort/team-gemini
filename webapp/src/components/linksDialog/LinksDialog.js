import { Dialog, DialogTitle, List, ListItem, Link } from '@material-ui/core'

const LinksDialog = ({open, title, links, closeDialog}) => {
  return (
    <Dialog onClose={closeDialog} aria-labelledby="links-dialog" open={open}>
      <DialogTitle id="links-dialog">{title}</DialogTitle>
      <List>
        {links.map(([label, url]) => (
          <ListItem key={url}>
            <Link href={url} target="_blank">{label}</Link>
          </ListItem>
        ))}
      </List>
    </Dialog>
  )
}

export default LinksDialog
